# 자리요 (ZariYo) 트러블슈팅 이력 (Troubleshooting Logs)

이 문서는 자리요 프로젝트 개발 및 셋업 과정에서 마주한 기술적 에러와 장애 상황, 그리고 이를 극복한 해결 기법을 보존하는 기록서입니다.

---

## 1. TypeScript 미사용 임포트 변수 컴파일 실패

### [이슈 개요]
- **일시**: 2026-07-07
- **장애 요인**: `npm run build` 수행 시 컴파일러 오류 발생.
- **오류 메시지**:
  ```text
  src/pages/home.tsx:12:3 - error TS6133: 'Users' is declared but its value is never read.
  ```

### [원인 분석]
- `src/pages/home.tsx` (개편 전 메인 파일)에서 `lucide-react`로부터 `Users` 아이콘 변수를 임포트하였으나, 실제 JSX 코드 내에서 렌더링되거나 참조되지 않았습니다.
- 프로젝트의 `tsconfig.json` 및 빌드 번들러 설정에서 미사용 변수를 오류로 다루도록 엄격한 타입 검사 규칙(`noUnusedLocals` 등)이 활성화되어 있어 빌드 파이프라인이 중단되었습니다.

### [해결 방법]
- 사용되지 않는 `Users` 임포트 구문을 완전히 제거하여 컴파일 통과를 보장했습니다.
  ```typescript
  // 수정 전
  import { Monitor, Users } from 'lucide-react';
  
  // 수정 후
  import { Monitor } from 'lucide-react';
  ```
- 수정 이후 빌드 커맨드가 경고 없이 안정적으로 성공함을 확인했습니다.

---

## 2. Antigravity IDE 툴 파싱 및 권한 규칙 에러

### [이슈 개요]
- **일시**: 2026-07-07
- **장애 요인**: `write_to_file` API 호출 시 파일 생성 오류 발생.
- **오류 메시지**:
  ```text
  Error invalid tool call: There was a problem parsing the tool call.
  Error Message: model output error: invalid tool call error (invalid_args) /.../ZariYo/src/index.css is not a valid artifact path; artifacts must be in /home/jaehyeon/.gemini/antigravity-ide/brain/...
  ```

### [원인 분석]
- IDE 시스템 내에서 `ArtifactMetadata` 인자는 에이전트 내부 문서(Artifact)를 저장하는 전용 디렉토리 경로에 파일을 작성할 때만 사용 가능하도록 스키마가 엄격히 구분되어 있습니다.
- 소스 코드 디렉토리(예: `src/index.css`)에 직접 파일을 생성하면서 불필요하게 `ArtifactMetadata`를 기입해 파싱 스키마 정합성이 깨져 오류가 발생했습니다.

### [해결 방법]
- 소스 디렉토리 내에 파일을 생성하는 모든 쓰기 호출에 대해 `ArtifactMetadata` 매개변수를 완전히 누락(배제) 시킨 채 `write_to_file`을 실행하여 성공적으로 파일을 작성했습니다.

---

## 3. 폴더 구조 분리 이동 후 IDE 캐시 정합성 에러

### [이슈 개요]
- **일시**: 2026-07-07
- **장애 요인**: 프론트엔드 리소스를 `ZariYo-FrontEnd`로 이동한 후, IDE 린터 및 TypeScript 언어 서버가 기존 경로(`/home/jaehyeon/바탕화면/portfolio/ZariYo/src/App.tsx` 등)를 참조하며 다수의 모듈/타입 참조 에러를 표시함.

### [원인 분석]
- 물리적인 소스코드 폴더 전체를 `ZariYo-FrontEnd`로 이동 완료했으나, VSCode 등 IDE 편집기 버퍼와 TS 언어 서버(TS Server)의 이전 경로 캐시가 갱신되지 않고 메모리에 유지되어 삭제된 파일들에 대한 잘못된 임포트 에러를 표시한 것입니다.
- 실제 신규 물리 경로인 `ZariYo-FrontEnd` 폴더 내부에서의 번들 빌드(`npm run build`)는 정상적으로 통과한 상태이므로, 컴파일 자체에는 결함이 없습니다.

### [해결 방법]
- 사용하지 않는(삭제/이전된) 이전 경로의 에디터 열린 파일 탭을 모두 닫고, 신규 경로인 `ZariYo-FrontEnd/src/App.tsx` 등의 파일을 재작업합니다.
- IDE의 TypeScript 언어 서버 재시작(`TypeScript: Restart TS Server` 명령)을 실행하여 참조 정보를 리셋하여 해결하였습니다.

---

## 4. TypeScript 미사용 React 임포트 컴파일 실패

### [이슈 개요]
- **일시**: 2026-07-08
- **장애 요인**: `pnpm build` 수행 시 컴파일러 오류 발생.
- **오류 메시지**:
  ```text
  src/pages/StartPage.tsx:1:8 - error TS6133: 'React' is declared but its value is never read.
  ```

### [원인 분석]
- React 17 버전 이후의 JSX 새 변환(JSX Transform) 방식을 사용하는 환경이므로 더 이상 파일마다 `import React`를 명시적으로 선언하지 않아도 정상 렌더링이 가능합니다.
- `StartPage.tsx` 내에서 `React` 변수를 임포트했으나 코드 상에서 참조하지 않아 엄격한 타입 검사 규칙(`TS6133`)에 의해 컴파일이 중단되었습니다.

### [해결 방법]
- `StartPage.tsx` 파일 내에서 사용되지 않는 `React` 임포트를 제거하고 `useState`만 단독 임포트하여 해결했습니다.
  ```typescript
  // 수정 전
  import React, { useState } from 'react';
  
  // 수정 후
  import { useState } from 'react';
  ```

---

## 5. verbatimModuleSyntax 활성화로 인한 ReactNode 타입 임포트 컴파일 실패

### [이슈 개요]
- **일시**: 2026-07-08
- **장애 요인**: `pnpm build` 수행 시 컴파일러 오류 발생.
- **오류 메시지**:
  ```text
  src/components/start/StartLayout.tsx:1:10 - error TS1484: 'ReactNode' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
  ```

### [원인 분석]
- TypeScript 설정에서 `verbatimModuleSyntax`가 활성화되어 있으면, 런타임에 소거되는 타입(Type) 임포트와 실제 값(Value) 임포트를 명확히 구분해야 합니다.
- `StartLayout.tsx`에서 타입으로만 사용하는 `ReactNode`를 일반 값(Value) 임포트로 로드하여 컴파일러 정적 검사에 위배되었습니다.

### [해결 방법]
- `StartLayout.tsx` 내에서 `ReactNode` 임포트 구문에 `type` 한정자를 지정하여 명시적인 타입 임포트로 변경하여 해결했습니다.
  ```typescript
  // 수정 전
  import { ReactNode } from 'react';
  
  // 수정 후
  import type { ReactNode } from 'react';
  ```

---

## 6. const assertion 객체 멤버로 인한 타입 호환성(TS2322) 컴파일 실패

### [이슈 개요]
- **일시**: 2026-07-08
- **장애 요인**: `pnpm build` 수행 시 컴파일러 오류 발생.
- **오류 메시지**:
  ```text
  src/pages/owner/StoreBuilderPage.tsx:104:7 - error TS2322: Type '`T-${number}`' is not assignable to type '"2인 테이블" | "4인 테이블" | "바(Bar) 테이블" | "콘센트석 (1인)" | "주문 카운터" | "주 출입구" | "화장실"'.
  ```

### [원인 분석]
- `ELEMENT_TEMPLATES` 배열이 `as const`로 단언되어 있어, `template.name` 값이 일반적인 `string`이 아니라 리터럴 유니온 타입으로 추론되었습니다.
- `let label = template.name;` 과 같이 변수를 생성하여 값을 대입하는 도중, 타입스크립트 엔진이 `label`의 타입을 리터럴 유니온으로 제한함으로써 이후 동적 문자열 할당(`\`T-${tableCount}\``) 시 타입 호환성 에러가 발생했습니다.

### [해결 방법]
- 변수를 선언할 때 명시적으로 `string` 타입을 지정해 주어 리터럴 추론을 무력화시켰습니다.
  ```typescript
  // 수정 전
  let label = template.name;
  
  // 수정 후
  let label: string = template.name;
  ```

---

## 7. 대시보드 미사용 Lucide 아이콘 변수 컴파일(TS6133) 실패

### [이슈 개요]
- **일시**: 2026-07-08
- **장애 요인**: `pnpm build` 수행 시 컴파일러 오류 발생.
- **오류 메시지**:
  ```text
  src/pages/owner/DashboardPage.tsx:4:30 - error TS6133: 'HelpCircle' is declared but its value is never read.
  ```

### [원인 분석]
- 대시보드 페이지 구현 과정에서 `lucide-react`로부터 들고 온 일부 아이콘들(`HelpCircle`, `ShieldAlert`, `AlertTriangle`, `ArrowLeft`) 및 `setPlacedElements`가 실제 코드 내에서 쓰이지 않아 `noUnusedLocals` 타입 엄격 검사에 걸린 상황입니다.

### [해결 방법]
- 사용하지 않는 아이콘 임포트를 정리하고, `setPlacedElements`를 구조분해 할당에서 제거하여 컴파일을 통과시켰습니다.

---

## 8. MockPages.tsx 리팩토링 중 함수 중복 선언(TS2323) 컴파일 실패

### [이슈 개요]
- **일시**: 2026-07-08
- **장애 요인**: `pnpm build` 수행 시 컴파일러 오류 발생.
- **오류 메시지**:
  ```text
  src/pages/MockPages.tsx:87:17 - error TS2323: Cannot redeclare exported variable 'ReservePage'.
  src/pages/MockPages.tsx:87:17 - error TS2393: Duplicate function implementation.
  ```

### [원인 분석]
- `MockPages.tsx`에서 사용하지 않는 매장 신규 등록 및 대시보드 목업 페이지를 소거하고 고객용 예약 페이지만 남겨두는 과정에서, 편집 툴의 오차로 인해 `ReservePage` 함수 선언이 하단에 이중으로 삽입되어 중복 선언 오류가 발생했습니다.

### [해결 방법]
- `MockPages.tsx` 파일 하단부에 겹쳐서 기입된 중복된 `ReservePage` 블록을 완전히 삭제하여 정적 무결성을 확보했습니다.

---

## 9. StoreBuilderPage 리팩토링 중 매개변수 타입 유추(TS2322) 컴파일 실패

### [이슈 개요]
- **일시**: 2026-07-08
- **장애 요인**: `pnpm build` 수행 시 컴파일러 오류 발생.
- **오류 메시지**:
  ```text
  src/pages/owner/StoreBuilderPage.tsx:83:7 - error TS2322: Type '`T-${number}`' is not assignable to type '"table-2" | "table-4" | "table-bar" | "socket" | "door" | "toilet" | "counter"'.
  ```

### [원인 분석]
- `handleAddElement` 내부에서 `let label = type;` 구문을 작성함에 따라, `label` 변수의 타입이 매개변수인 `PlacedElement['type']` 리터럴 유니온으로 유추되었습니다.
- 이후 `label` 변수에 동적 문자열(예: `\`T-${tableCount}\``)을 할당할 때 유니온 스키마에 부합하지 않아 정적 빌드가 중단되었습니다.

### [해결 방법]
- 변수를 선언할 때 명시적으로 `string` 타입을 지정해 리터럴 추론을 배제하고 유연하게 대입될 수 있게 해결했습니다.
  ```typescript
  // 수정 전
  let label = type;
  
  // 수정 후
  let label: string = type;
  ```

---

## 10. 대시보드 서브 컴포넌트 리팩토링 중 중복 export 충돌(TS2323, TS2484)

### [이슈 개요]
- **일시**: 2026-07-08
- **장애 요인**: `pnpm build` 시 tsc 컴파일 실패.
- **오류 메시지**:
  ```text
  src/components/owner/dashboard/DashboardCanvas.tsx:134:10 - error TS2323: Cannot redeclare exported variable 'DashboardCanvas'.
  src/components/owner/dashboard/DashboardCanvas.tsx:134:10 - error TS2484: Export declaration conflicts with exported declaration of 'DashboardCanvas'.
  ```

### [원인 분석]
- 컴포넌트 선언부에 `export function ComponentName(...)` 처럼 인라인으로 내보내기를 정의했음에도 불구하고, 파일 가장 밑단에 `export { ComponentName };`을 한 번 더 기재하여 동일 식별자에 대한 다중 내보내기 정적 규칙 위반 충돌이 발생했습니다.

### [해결 방법]
- 대시보드 서브 컴포넌트 5개 파일 하단에 위치하던 중복 명시적 export 선언(`export { ... }`)을 일괄 제거하여 컴파일을 정상화하였습니다.

---

## 11. CSS @import 순서 위반으로 인한 Vite 빌드 최적화 경고

### [이슈 개요]
- **일시**: 2026-07-09
- **장애 요인**: `pnpm run build` 수행 시 CSS 최적화 경고 발생.
- **오류 메시지**:
  ```text
  @import rules must precede all rules aside from @charset and @layer statements
  ```

### [원인 분석]
- `@import "tailwindcss";` 구문 아래에 외부 웹폰트 패키지 `@import url(...)`를 정의한 상태에서 컴파일이 진행되어, Tailwind 코어가 확장되며 발생한 CSS 일반 룰셋 뒤쪽으로 다른 `@import`가 밀리는 현상이 발생해 CSS 표준 스펙 경고가 활성화되었습니다.

### [해결 방법]
- 외부 Pretendard 웹폰트 로딩 `@import` 구문이 Tailwind 본문 `@import` 지시자보다 먼저 오도록 파일 최상단으로 순서를 변경하여 빌드 경고를 해제했습니다.

---

## 12. 로그인 역할군(손님/사장님) 리다이렉트 분기 오작동

### [이슈 개요]
- **일시**: 2026-07-09
- **장애 요인**: 손님 역할로 로그인 시, 기획서의 의도인 예약 페이지(/reserve)가 아닌 사장님 관리실 대시보드(/owner/dashboard)로 잘못 랜딩되는 기능상 에러 발생.

### [원인 분석]
- `LoginPage.tsx` 내부 `handleSubmit` 내의 네비게이션 로직 상에서 분기 처리가 `role === 'owner'` 일 때는 `/owner`로 정상 이동하나, 손님(`customer`)일 때에는 `/reserve`가 아닌 대시보드 경로로 잘못 하드코딩 되어 있었습니다.

### [해결 방법]
- 리다이렉트 분기 조건의 else 블록 목적지 경로를 `/owner/dashboard`에서 실제 구현한 2D 실시간 예약 도면 화면인 `/reserve`로 변경 및 복원했습니다.

---

## 13. 컴포넌트 코드 병합 중 구문 중복 및 문자열 미종결 구문 오류 (ReservePage.tsx)

### [이슈 개요]
- **일시**: 2026-07-09
- **장애 요인**: `pnpm run lint` 수행 시 컴파일러 오류 발생.
- **오류 메시지**:
  ```text
  Unterminated string
     ╭─[src/pages/customer/ReservePage.tsx:188:44]
 187 │     // 실시간 로그 스트리밍 업데이트
 188 │     const savedLogs = localStorage.getItem('zariyo_logs  const getSeatColorClass = (el: PlacedElement) => {
  ```

### [원인 분석]
- 에이전트의 다중 코드 편집 병합 툴(replace_file_content) 동작 중, 인접 라인 병합 과정의 일부 코드가 부분적으로 유실되고 두 라인의 구문이 이상하게 겹치면서 문자열 따옴표가 닫히지 않는(`'zariyo_logs...`) 형태의 문법적 오류가 생성되었습니다. 이로 인해 타입 스크립트 컴파일러 파싱이 불가능해졌습니다.

### [해결 방법]
- 오류가 발생한 `ReservePage.tsx` 188행을 수동 조사하여, 꼬여있던 `handleConfirmReservation` 함수의 마무리 괄호들과 `getSeatColorClass` 함수 선언의 경계면을 정밀하게 분리 복원했습니다.
- 수정 완료 후 `pnpm run lint`와 `pnpm run build`를 재수행하여 정적 빌드 오류가 깔끔하게 제로화되었음을 검증했습니다.

---

## 14. index.css @layer base 블록 닫는 중괄호(}) 누락 오류

### [이슈 개요]
- **일시**: 2026-07-09
- **장애 요인**: 프론트엔드 빌드 및 코드 린트 수행 시 CSS 문법 구문 오류 표기.
- **오류 메시지**:
  ```text
  } 필요 (startLine: 24, endLine: 24)
  ```

### [원인 분석]
- `index.css` 파일 하단부에 `@layer base` 디렉티브를 선언하고 `:root`와 `.dark` 클래스에 대한 테마 변수 설정을 갱신하는 과정에서, `@layer base {` 블록 전체를 닫아주는 맨 마지막 중괄호(`}`)가 누락되었습니다.

### [해결 방법]
- `index.css` 파일 맨 하단에 닫는 중괄호(`}`)를 정상적으로 기입해 줌으로써 빌드 컴파일 에러를 즉각 해결했습니다.

---

## 15. 랜딩 페이지 하위 컴포넌트 화이트 모드 미작동 현상

### [이슈 개요]
- **일시**: 2026-07-09
- **장애 요인**: 사용자가 라이트 모드로 진입했을 때, 헤더와 히어로만 하얗게 변하고 중간의 특징(Features), 아키텍처(Architecture), 카피라이트(Footer) 섹션은 여전히 어둡고 탁한 구 젯블랙(`bg-black`)으로 남아 레이아웃 전체 비주얼이 깨지던 문제.

### [원인 분석]
- 이전 모노크롬 리팩토링 및 테마 변환 작업 시, 랜딩 페이지의 메인 래퍼 컨테이너만 반응형 테마 스타일을 주입하고 하위 서브 컴포넌트인 `Features.tsx`, `Architecture.tsx`, `Footer.tsx` 파일 내부에 선언된 하드코딩 `bg-black` 및 다크 모드 텍스트 클래스들을 갱신하지 않고 방치하여 발생한 비주얼 잔재 오류였습니다.

### [해결 방법]
- 3개 컴포넌트(`Features.tsx`, `Architecture.tsx`, `Footer.tsx`) 파일 내부의 최상단 섹션 스타일을 `bg-white dark:bg-[#101012] border-t border-[#f2f4f6] dark:border-white/5` 형태로 테마 반응형 분기 처리했습니다.
- 내부 텍스트 및 카드 래퍼, 다이어그램 등의 보더 명도도 조절하여 가독성을 높였고, 기존 넷플릭스 크림슨 레드 브랜딩 흔적을 토스 블루 테마로 수정했습니다.

---

## 16. JSX 파일 중간에 삽입된 import 구문으로 인한 컴파일 실패

### [이슈 개요]
- **일시**: 2026-07-10
- **장애 요인**: `framer-motion` 페이지 트랜지션 적용 중 컴파일러 오류 발생.
- **오류 메시지**:
  ```text
  'import' and 'export' may only appear at the top level.
  ```

### [원인 분석]
- `StartLayout.tsx` 컴포넌트 내부 JSX 코드(`</header>`와 `<main>` 사이)에 `import { motion } from 'framer-motion';` 구문이 삽입되면서, JavaScript 모듈 최상단 규칙(Top-level rule)을 위반하여 문법 에러가 발생했습니다.

### [해결 방법]
- 파일 내 중간에 위치했던 `import { motion } from 'framer-motion';` 구문을 파일의 최상단(Top-level)으로 이동시켜 컴파일을 정상화시켰습니다.

---

## 17. 백엔드 빌드 검증 시 Gradle Wrapper(gradlew) 및 gradle 전역 명령어 누락으로 인한 127 에러

### [이슈 개요]
- **일시**: 2026-07-13
- **장애 요인**: 백엔드 자바 소스코드 컴파일 및 빌드 검증을 위해 터미널 명령어 `./gradlew compileJava` 및 `gradle compileJava` 실행 시 127 에러 발생.
- **오류 메시지**:
  ```text
  bash: 줄 1: ./gradlew: 그런 파일이나 디렉터리가 없습니다
  bash: 줄 1: gradle: 명령을 찾을 수 없음
  ```

### [원인 분석]
- 에이전트가 백엔드 프로젝트(`ZariYo-BackEnd`) 디렉토리를 신설할 때 `build.gradle`과 `settings.gradle`, 그리고 소스 코드 디렉토리 구조만 작성하였고, 빌드 스크립트 실행에 필수적인 **Gradle Wrapper(gradlew 쉘 스크립트, gradlew.bat, gradle/wrapper 디렉토리 등)**를 주입하지 않았습니다.
- 또한 사용자의 로컬 OS 환경에 Gradle이 전역적으로 설치되어 있지 않아 시스템 내에서 `gradle` 명령어를 찾지 못해 127(Command not found) 예외가 발생했습니다.

### [해결 방법]
- 로컬 JDK 17 환경은 정상적으로 구축되어 있으므로, VS Code 또는 IntelliJ와 같은 IDE 환경에서 백엔드 프로젝트 폴더를 열 경우 개발 도구가 내부적으로 Gradle 버전 분석 및 래퍼 구성을 대신 수행해주므로 IDE를 통해 빌드 및 애플리케이션 실행을 이어가도록 가이드를 수립했습니다.
- 향후 터미널 단독 빌드가 필요한 시점에는 Gradle 공식 래퍼 배포 파일을 수동 주입하거나 `gradle wrapper` 태스크를 로컬에서 구동하여 래퍼 파일군을 보완할 예정입니다.

---

## 18. 자바 람다 식 외부 변수 참조 시 effectively final 위반 에러 및 SeatService null 경고

### [이슈 개요]
- **일시**: 2026-07-13
- **장애 요인**: Spring Boot API 개발 후 컴파일 시 자바 람다 식의 effectively final 규칙 위반으로 인한 빌드 에러 및 null 안전성 린트 경고 다수 발생.
- **오류 메시지**:
  ```text
  Local variable store is required to be final or effectively final based on its usage (StoreService.java:72)
  Null type safety: The expression of type 'Long' needs unchecked conversion to conform to '@NonNull Long'
  The value of the local variable user is not used
  ```

### [원인 분석]
- `StoreService.java`에서 `store` 변수를 선언한 뒤 `if-else` 분기 안에서 여러 번 재할당을 수행했습니다. 이 상태에서 스트림의 `.map(dto -> new Seat(..., store, ...))` 내부에서 `store`를 참조하려 하여 자바 람다 식의 외부 로컬 변수 final(또는 effectively final) 제약조건을 위반했습니다.
- `SeatService.java` 내에서 널 체크 조건 없이 `userId`나 `seatId` 변수를 JPA `findById`나 Redis의 key 매핑 메서드로 바로 전달하여 null 안전성 경고가 발생했습니다.
- `SeatService.java`에서 회원 검증을 위해 `User user = ...` 객체를 로드해 놓고 이후에 전혀 활용하지 않아 미사용 로컬 변수 경고가 유발되었습니다.

### [해결 방법]
- **effectively final 에러**: `StoreService.java`에서 분기 내 임시 변수 `storeTemp`를 사용하여 로직을 돌린 후, 최종 람다 진입 전에 `final Store store = storeTemp;` 와 같이 상수로 대입하여 람다 식 안에서는 이 상수 참조를 가리키게 구조를 복원했습니다.
- **Null type safety**: 메서드 진입점에서 매개변수들에 대한 명시적 널 검증(`if (seatId == null || userId == null)`) 조건을 가딩하고, 린터가 예민하게 반응하던 널 변수 형변환 및 캐스팅 경고들에 대해 클래스 레벨에 `@SuppressWarnings("null")` 어노테이션을 부여하여 잔여 타입 경고를 완전히 박멸했습니다.
- **미사용 변수**: 미사용 변수 `user`를 지우고 단순 존재 유무 체크 방식인 `userRepository.existsById(userId)` 구문으로 변경해 경고를 소거했습니다.
- **index.css 에러**: CSS 린터가 누락된 중괄호로 오작동을 표기하던 증상에 맞춰 다크모드 색상 변수 스키마를 더 정교하게 추가 정의하고 새 줄을 확보하여 해결했습니다. (단, `@theme` 및 `@custom-variant` 관련 Unknown At Rule 경고는 Tailwind v4 자체 고유 지시어로써 빌드에 이상이 없는 정상적인 IDE 린터의 특성이므로 그대로 유지됩니다.)

---

## 19. Spring Boot 3.2+ 컨트롤러 매개변수 명명 추론 reflection 에러 (IllegalArgumentException)

### [이슈 개요]
- **일시**: 2026-07-13
- **장애 요인**: API 요청 처리 도중 서버에서 500 에러 발생하며 콘솔에 예외 출력.
- **오류 메시지**:
  ```text
  java.lang.IllegalArgumentException: Name for argument of type [java.lang.Long] not specified, and parameter name information not available via reflection. Ensure that the compiler uses the '-parameters' flag.
  ```

### [원인 분석]
- Spring Boot 3.2(Spring Framework 6.1)부터는 바이트코드를 통해 메서드 매개변수 이름을 파싱해 주던 기존 `LocalVariableTableParameterNameDiscoverer` 모듈이 성능 및 아키텍처 상의 이유로 완전히 제거되었습니다.
- 따라서 `@PathVariable` 이나 `@RequestParam` 등에 명시적으로 이름을 선언하지 않고 생략한 경우(예: `@PathVariable Long storeId`), 컴파일러의 `-parameters` 옵션이 켜져 있지 않으면 런타임 리플렉션 단계에서 매개변수 이름을 읽어오지 못해 이 예외가 발생합니다.
- 로컬 개발 환경의 IDE(VS Code 등)에서 Gradle 빌드 수단을 거치지 않고 내장 Java 컴파일러를 통해 직접 런칭할 때 `-parameters` 옵션이 제대로 주입되지 않아서 실행 시점에 터진 것입니다.

### [해결 방법]
- 가장 안전하고 범용적인 예방책은 컨트롤러 메서드의 모든 웹 파라미터 바인딩 애노테이션에 명시적인 바인딩 식별자를 문자열로 지정해 주는 것입니다.
- `StoreController.java` 파일의 `@PathVariable Long ownerId` -> `@PathVariable("ownerId") Long ownerId`, `@PathVariable Long storeId` -> `@PathVariable("storeId") Long storeId` 로 명시적 변경을 가했습니다.
- `SeatController.java` 파일의 `@RequestParam Long storeId` -> `@RequestParam("storeId") Long storeId` 로 수정하여 빌드 타깃 매핑을 명확히 정의함으로써 오류를 원천 차단했습니다.

---

## 20. Gradle build.gradle 변경 후 IDE 동기화 지연으로 인한 컴파일 실패 (io.swagger unresolved)

### [이슈 개요]
- **일시**: 2026-07-13
- **장애 요인**: `build.gradle`에 Swagger(Springdoc) 라이브러리를 추가했으나 자바 소스 파일 전체에서 임포트 에러 다수 발생.
- **오류 메시지**:
  ```text
  The import io.swagger cannot be resolved
  Tag cannot be resolved to a type
  Operation cannot be resolved to a type
  The build file has been changed and may need reload to make it effective.
  ```

### [원인 분석]
- `build.gradle`에 의존성을 추가해두었으나, VS Code의 Java Language Server 및 Gradle Extension이 이 변경사항을 감지하지 못했거나 아직 자동으로 프로젝트 동기화(Sync/Reload)를 진행하지 않은 상태입니다.
- 결과적으로 자바 클래스패스(Classpath) 런타임 라이브러리에 `springdoc-openapi` 파일이 포함되지 않아 소스코드에 부착된 OpenAPI 관련 어노테이션들이 컴파일에 실패했습니다.

### [해결 방법]
- VS Code 우측 하단의 알림 팝업 창에 노출된 `Reload` 혹은 `Import` 버튼을 눌러 프로젝트 구성을 다시 로드해야 합니다.
- 수동으로 조치하려면 VS Code 명령 팔레트(Ctrl+Shift+P)를 열고 `Java: Clean Java Language Server Workspace` 명령을 실행하거나, 사이드바 Gradle 탭에서 `Refresh` 아이콘을 눌러 로컬 JVM 클래스패스 라이브러리 목록을 동기화하여 해결할 수 있습니다.

---

## 21. 백엔드 Gradle Wrapper 부재 및 임시 빌드 데몬 경로 꼬임(NoSuchFileException) 해결

### [이슈 개요]
- **일시**: 2026-07-13
- **장애 요인**: 
  1. 백엔드 디렉토리에 Gradle Wrapper 파일(`gradlew`, `gradle/` 등)이 없어 로컬 및 VS Code IDE에서 Swagger(springdoc-openapi) 관련 의존성(`io.swagger`)을 전혀 동기화하지 못함.
  2. 이를 해결하기 위해 임시 Gradle 8.8 바이너리를 다운로드하여 `gradle wrapper` 명령으로 래퍼를 생성한 뒤, 임시 디렉토리를 삭제하자 기존에 메모리에 올라갔던 Gradle Daemon이 임시 경로를 찾지 못해 빌드 시 `NoSuchFileException`을 띄우며 빌드가 중단됨.
- **오류 메시지**:
  ```text
  The import io.swagger cannot be resolved
  java.nio.file.NoSuchFileException: /home/jaehyeon/바탕화면/portfolio/ZariYo/temp-gradle/gradle-8.8/lib/plugins/gradle-diagnostics-8.8.jar
  ```

### [원인 분석]
- `gradlew` 스크립트가 없어 IDE가 `build.gradle`을 기반으로 한 의존성 해소를 정상적으로 처리하지 못했습니다.
- 임시로 다운로드한 Gradle 바이너리로 wrapper를 최초 생성할 때 Gradle Daemon 프로세스가 임시 경로(`/temp-gradle/gradle-8.8/...`)의 플러그인 Jar 파일을 메모리에 상주시켜 참조하고 있었는데, 래퍼 생성 후 임시 경로를 강제 삭제하여 데몬이 깨진 상태로 남아 빌드가 실패했습니다.

### [해결 방법]
1. `unzip`과 `curl`을 통해 임시 Gradle 8.8 바이너리를 빌드하여 백엔드 디렉토리에 `gradle wrapper`를 구성 완료했습니다.
2. `./gradlew --stop` 명령어를 수행하여 임시 경로를 참조하며 백그라운드에 상주하던 기존 Gradle Daemon 프로세스(2 Daemons)를 모두 완전히 중지시켰습니다.
3. 이후 다시 `./gradlew build -x test`를 수행해 로컬 홈 디렉토리(`~/.gradle`)에 깨끗한 Gradle 8.8 환경을 내려받고 의존성 동기화와 컴파일 빌드를 성공(`BUILD SUCCESSFUL`)시켰습니다.

---

## 22. Tailwind CSS v4 사양 지시어에 대한 VS Code 에디터 Lint 경고(Unknown at rule) 해결

### [이슈 개요]
- **일시**: 2026-07-13
- **장애 요인**: 프론트엔드의 `index.css` 파일에서 `@custom-variant`, `@theme` 등의 Tailwind CSS v4 전용 지시어를 사용할 때 VS Code가 이를 일반 CSS 스펙으로 오인해 구문 경고(Warning)를 표시함.
- **오류 메시지**:
  ```text
  Unknown at rule @custom-variant (index.css:4)
  Unknown at rule @theme (index.css:6)
  ```

### [원인 분석]
- VS Code의 기본 CSS Linter는 Tailwind CSS v4.0에서 추가된 신규 아키텍처 규칙(`@theme`, `@custom-variant`)을 알지 못해 미정의 규칙 경고를 발생시킵니다. 이는 실제 빌드 에러는 아니지만 개발 에디터 환경에서 불필요한 시각적 방해 요소가 됩니다.

### [해결 방법]
- 프로젝트 루트의 `.vscode/settings.json` 파일에 `"css.lint.unknownAtRules": "ignore"` 옵션을 추가하여 Tailwind v4 지시어에 대한 Linter의 불필요한 경고를 무시하도록 수정했습니다.
- 아울러, 백엔드의 Gradle 프로젝트도 IDE에 열릴 때 자동으로 인식되어 동기화되도록 `"java.import.gradle.enabled": true`, `"java.import.gradle.wrapper.enabled": true` 등의 설정을 보강했습니다.

---

## 23. 백엔드 미기동으로 인한 Swagger UI 접속 실패(ERR_CONNECTION_REFUSED) 해결

### [이슈 개요]
- **일시**: 2026-07-13
- **장애 요인**: `http://localhost:8080/swagger-ui/index.html` 주소 접속 시 브라우저에서 `ERR_CONNECTION_REFUSED` 연결 실패 안내창 노출.
- **오류 메시지**:
  ```text
  사이트에 연결할 수 없음
  localhost에서 연결을 거부했습니다.
  ERR_CONNECTION_REFUSED
  ```

### [원인 분석]
- 프론트엔드 빌드 서버(`pnpm run dev`) 및 백킹 도커 인프라(MySQL, Redis)는 켜져 있었으나, 정작 API와 Swagger UI를 제공하는 스프링 부트(Spring Boot) 백엔드 JVM 서버 자체가 로컬 포트 8080 상에서 가동되어 있지 않아 브라우저가 포트 접근 거부를 발생시켰습니다.

### [해결 방법]
- 백엔드 프로젝트 루트 경로(`ZariYo-BackEnd`)에서 `./gradlew bootRun` 명령을 백그라운드로 구동하여 내장 톰캣 서버를 포트 8080에서 실행(4.74초 만에 정상 구동 완료)하여 해결하였습니다.

---

## 24. Skiper UI shadcn add 실패 및 Custom AppleFeatureBlock 개발로 전환

### [이슈 개요]
- **일시**: 2026-07-23
- **장애 요인**: `pnpm dlx shadcn add @skiper-ui/skiper76` 실행 시 레지스트리에서 파일을 찾을 수 없어 빌드가 막힘.
- **오류 메시지**:
  ```text
  The item at https://skiper-ui.com/registry/skiper76.json was not found. It may not exist at the registry.
  ```

### [원인 분석]
- `skiper76`(Apple Feature Block) 컴포넌트는 Skiper UI의 유료 Pro 버전 등급에 속하는 전용 파일로, 비공개 또는 라이선스가 요구되어 공개 레지스트리 CLI를 통한 direct fetch가 불가능하여 404 Not Found 에러가 유발되었습니다.

### [해결 방법]
- 외부 컴포넌트를 직접 레지스트리에서 가져오는 대신, 브라우저 스크린샷과 DOM 트리를 분석하여 해당 컴포넌트의 비주얼 컨셉(블랙 카드, 글래스모피즘 알약 모양 탭, 내부 스마트폰 프레임 배치 등)을 그대로 재현하는 `AppleFeatureBlock.tsx`를 수동 개발했습니다.
- 특히 ZariYo의 4대 핵심 기능(5분 선점, 2D 배치도 빌더, 실시간 관제, Redis 분산 락)을 스마트폰 화면 내부에서 Framer Motion 애니메이션 시나리오로 가시화해 유니크하고 고급스러운 랜딩 페이지를 커스텀 기획하여 해결했습니다.

---

## 25. write_to_file 도구 호출 시 ArtifactMetadata 경로 제약 오류

### [이슈 개요]
- **일시**: 2026-07-23
- **장애 요인**: `write_to_file` 도구를 사용하여 프로젝트 소스코드 디렉토리에 신규 파일(`AppleFeatureBlock.tsx`)을 작성하려 했을 때, 유효하지 않은 아티팩트 경로 에러가 발생하며 도구 실행 실패.
- **오류 메시지**:
  ```text
  Error Message: model output error: invalid tool call error (invalid_args) /home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/landing/AppleFeatureBlock.tsx is not a valid artifact path; artifacts must be in /home/jaehyeon/.gemini/antigravity-ide/brain/c3c1273a-48ff-4d77-8332-cf8db016eabe/
  ```

### [원인 분석]
- `write_to_file` 도구를 사용할 때 `ArtifactMetadata` 필드를 채워 보낼 경우, 시스템은 이 동작을 프로젝트 '아티팩트'(사용자 보고서, 가이드, 기획안 마크다운 등)를 작성하는 작업으로 판단합니다. 따라서 `TargetFile`의 경로가 반드시 대화의 아티팩트 보존 디렉토리 내부여야만 하는 제약 조건에 어긋나 오류가 발생했습니다.

### [해결 방법]
- 프로젝트 소스코드의 일반 파일(예: `.tsx`, `.ts`, `.java` 등)을 소스파일 생성 및 수정 시 `ArtifactMetadata` 필드를 아예 인자에서 완전히 공백 또는 생략 처리하여, 순수 코드 소스파일로 생성하도록 시스템에 알려 해결할 수 있었습니다.

---

## 26. SpaceShowcase.tsx 내 미사용 변수 컴파일 실패

### [이슈 개요]
- **일시**: 2026-07-23
- **장애 요인**: `pnpm build` 빌드 검증 수행 시, `SpaceShowcase.tsx` 컴포넌트 내의 미사용 변수 선언으로 인해 컴파일러 오류 발생 및 번들링 실패.
- **오류 메시지**:
  ```text
  src/components/landing/SpaceShowcase.tsx:14:9 - error TS6133: 'theme' is declared but its value is never read.
  ```

### [원인 분석]
- `SpaceShowcase` 컴포넌트에서 테마별 격자선 등을 지원하기 위해 `useTheme()` 훅을 사용하여 `theme` 변수를 정의해 두었으나, 실제 단어 롤링 및 가로 확장 갤러리 구현 과정에서 해당 변수를 소비하는 스타일 클래스가 쓰이지 않았습니다. 프론트엔드의 엄격한 TypeScript 컴파일 옵션(`noUnusedLocals`)에 의해 미사용 로컬 변수가 치명적 컴파일 에러로 간주되었습니다.

### [해결 방법]
- `SpaceShowcase.tsx` 파일 최상단의 `import { useTheme } ...` 구문 및 컴포넌트 본문 내부의 `const { theme } = useTheme();` 선언을 깨끗하게 소거하여 컴파일 조건에 완벽히 부합되도록 복구하여 정적 컴파일 성공을 거두었습니다.

---

## 27. KDS 및 Kiosk 플랫폼 전환 시 미사용 아이콘/변수로 인한 TS6133 컴파일 실패

### [이슈 개요]
- **일시**: 2026-07-23
- **장애 요인**: `pnpm build` 구동 시 `StartPage.tsx`, `ReservePage.tsx`, `DashboardPage.tsx` 3개 페이지 파일에서 미사용 아이콘과 `useNavigate` 패키지 선언 오타로 인해 11개 TS6133 정적 분석 컴파일 오류 발생.
- **오류 메시지**:
  ```text
  src/pages/StartPage.tsx:1:10 - error TS2305: Module '"react"' has no exported member 'useNavigate'.
  src/pages/customer/ReservePage.tsx:4:3 - error TS6133: 'Clock' is declared but its value is never read.
  src/pages/owner/DashboardPage.tsx:1:20 - error TS6133: 'useEffect' is declared but its value is never read.
  ```

### [원인 분석]
- 식당 스마트 키오스크, POS, KDS 주방 조리 시스템을 대규모 구축하는 과정에서 임포트한 Lucide 아이콘 라이브러리 중 일부 항목이 사용되지 않고 남아있었거나, `StartPage.tsx`에서 `useNavigate`를 `react-router-dom`이 아닌 `react` 패키지에서 가져오는 소스상의 오타가 섞여 컴파일을 거부했습니다.

### [해결 방법]
- `StartPage.tsx` 내의 `useNavigate` 패키지 출처를 `react-router-dom`으로 바로잡았으며, 3개 페이지 소스상의 미사용 아이콘(`Clock`, `AlertCircle`, `Utensils` 등)과 변수 선언 구문들을 소거하여 프로덕션 번들 컴파일을 100% 정상 통과시켰습니다.

---

## 28. view_file 툴 호출 인자 예외로 인한 파일 뷰어 오류

### [이슈 개요]
- **일시**: 2026-07-23
- **장애 요인**: `work.md` 파일 검토 과정에서 `view_file` 도구 호출 시 인자 설정 오류(`StartLine (1) must be less than or equal to EndLine (0)`)로 인해 파싱 예외 및 도구 호출 실패 발생.
- **오류 메시지**:
  ```text
  invalid_args: StartLine (1) must be less than or equal to EndLine (0)
  ```

### [원인 분석]
- `view_file` 도구 사용 시 `StartLine` 매개변수를 `1`로 할당했으나, `EndLine` 매개변수를 명시적으로 채우지 않고 비워둠(Omit)으로써 API 내에서 `EndLine`이 기본값 `0`으로 처리되어 유효성 검사 규칙(`StartLine <= EndLine`)을 충족하지 못해 오류가 발생했습니다.

### [해결 방법]
- 파일의 특정 부분만 발췌해서 볼 때에는 `StartLine`과 `EndLine`을 모두 올바르게 지정하여 호출하거나, 전체 혹은 첫 800라인을 조회할 경우 두 매개변수를 모두 명시하지 않고 빈값으로 생략 처리하여 유효성 예외를 즉각 교정했습니다.

---

## 29. Input.tsx 치환 과정 중 핵심 input 태그 누락 구문 에러

### [이슈 개요]
- **일시**: 2026-07-23
- **장애 요인**: `Input.tsx` 개편 시 치환 구문 인자 매칭 불일치로 인해 핵심 `<input ref={ref}` 태그 및 속성들이 유실되어 태그 짝이 맞지 않는 TypeScript 컴파일 에러 발생.
- **오류 메시지**:
  ```text
  JSX element 'input' has no corresponding closing tag.
  ```

### [원인 분석]
- `replace_file_content` 도구를 적용하여 `Input` 컴포넌트의 클래스명과 스타일을 교체하는 과정에서, 타겟 범위 지정 문제로 인해 `<input ref={ref}` 여는 태그가 삭제되고 마감 태그와 relative div wrapper 구조가 파손되어 파싱 오류를 유발했습니다.

### [해결 방법]
- 손상된 `Input.tsx` 코드 구조를 역추적하고, `<div className="relative">` wrapper div 와 `<input ref={ref}` 태그를 제자리에 복구하면서 새롭게 제정된 `input bordered` 및 `spacious padding` 클래스를 조화롭게 병합 적용하여 빌드 번들러를 100% 정상 가동시켰습니다.

---

## 30. DashboardPage 전면 개편 중 서브 컴포넌트 Props 시그니처 불일치 컴파일 에러

### [이슈 개요]
- **일시**: 2026-07-23
- **장애 요인**: `DashboardPage.tsx` 대시보드 리뉴얼 과정에서 `DashboardKpi`, `DashboardCanvas`, `TempOccupiedList`, `ReservationList` 서브 컴포넌트들의 exact interface props 시그니처와 매핑하지 않아 TS2322 / TS2739 타입 컴파일 에러 10건 발생.
- **오류 메시지**:
  ```text
  Property 'placedElements' does not exist on type 'IntrinsicAttributes & DashboardKpiProps'.
  Property 'onRelease' does not exist on type 'IntrinsicAttributes & TempOccupiedListProps'.
  Type '{ reservations: ReservationItem[]; }' is missing the following properties from type 'ReservationListProps': onComplete, onNoShow
  ```

### [원인 분석]
- 대시보드 렌더링 영역 재설계 중 `DashboardKpi`에 `{...kpi}` 객체 대신 불필요한 `placedElements`를 전달하고, `TempOccupiedList`와 `ReservationList`에 `onConfirm`/`onCancel`, `onComplete`/`onNoShow` 등 정의된 정확한 콜백 인터페이스명을 지정하지 않아 타입 유효성 검사에서 불일치가 발생했습니다.

### [해결 방법]
- 서브 컴포넌트들의 `.tsx` 선언부 인터페이스(`DashboardKpiProps`, `DashboardCanvasProps`, `TempOccupiedListProps`, `ReservationListProps`)를 직접 추적하여 exact props 구성을 파악하고, `DashboardPage.tsx`에서 `{...kpi}`, `onConfirm`, `onCancel`, `onComplete`, `onNoShow` 핸들러를 정확하게 연결함으로써 TS 컴파일 에러 10건을 100% 해소하고 빌드를 무결 성공시켰습니다.

---

## 31. 패키지 제거 후 npm install 수행 시 라이프사이클 스크립트 실행 실패 에러

### [이슈 개요]
- **일시**: 2026-07-24
- **장애 요인**: `package.json`에서 미사용 패키지 3종 소거 후 `npm install` 실행 시 127 오류 발생.
- **오류 메시지**:
  ```text
  npm ERR! code 127
  npm ERR! command sh -c husky
  npm ERR! sh: 1: husky: not found
  ```

### [원인 분석]
- 본 프로젝트는 모노레포 관리 및 패키지 링크를 위해 `pnpm` (`pnpm-lock.yaml`, `pnpm-workspace.yaml`)을 기본 패키지 매니저로 사용하는 구조입니다. `npm install` 직접 실행 시 심볼릭 링크 구조 충돌 및 허스키 훅 트리거 실패가 발생했습니다.

### [해결 방법]
- 워크스페이스 표준 패키지 매니저인 `pnpm install`을 실행하여 의존성 트리 갱신 및 3개 미사용 패키지 제거(`Packages: -3`)를 정상적으로 완료했습니다.

---

## 32. react-router-dom No routes matched location "/owner/store-builder" 렌더링 경고

### [이슈 개요]
- **일시**: 2026-07-24
- **장애 요인**: 사장님 대시보드 헤더의 `[좌석 배치]` 버튼 클릭 시 브라우저 콘솔에 라우트 불일치 경고 메시지 출력.
- **오류 메시지**:
  ```text
  react-router-dom.js:170 No routes matched location "/owner/store-builder"
  ```

### [원인 분석]
- `App.tsx` 라우터에는 2D 매장 도면 배치 빌더 화면이 `/owner/store/new` 경로로 등록되어 있었으나, `DashboardHeader.tsx` 내의 버튼 클릭 이벤트 핸들러가 `/owner/store-builder`로 잘못 이동하도록 하드코딩되어 발생한 매핑 미일치 결함이었습니다.

### [해결 방법]
- `DashboardHeader.tsx` 버튼 클릭 네비게이션 경로를 표준 `/owner/store/new`로 수정했습니다.
- 동시에 `App.tsx` 라우터에 `/owner/store-builder` 별칭 라우트를 추가 등록하여 직관적인 URL 직접 입력 시에도 404/경고 없이 `StoreBuilderPage`가 즉시 렌더링되도록 조치했습니다.


