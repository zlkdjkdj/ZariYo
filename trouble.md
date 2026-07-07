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
