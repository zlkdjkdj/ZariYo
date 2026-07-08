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





