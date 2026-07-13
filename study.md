# ZariYo 백엔드 & 인프라 학습 노트 (Q&A)

이 문서는 개발 과정에서 발생한 질문과 답변, 핵심 개념들을 날짜 및 시간과 함께 기록하는 공간입니다.

---

### [2026-07-10 13:42] Q1. MySQL 설정과 데이터베이스 조작의 원리
**질문 (User)**: 
"그러면 mysql에 원래는 코드를 입력해서 db를 구성하는데 그 작업을 안해도 되는거야? 그리고 내용 저장등의 데이터베이스 작업은 어떻게 수행하는거야?"

**답변 (Antigravity)**:
과거의 전통적인 방식에서는 MySQL 터미널에 직접 접속해서 `CREATE TABLE ...` 명령어를 치고, 저장할 때도 `INSERT INTO ...` 같은 SQL 쿼리문을 직접 작성해야 했습니다. 하지만 **Spring Boot와 JPA(Java Persistence API)** 생태계에서는 이 모든 것을 자동화하는 **ORM(Object-Relational Mapping)** 방식을 사용합니다.

**1. 테이블은 어떻게 만들어지나요? (엔티티 - Entity)**
백엔드 코드를 짤 때 데이터베이스의 테이블 역할을 할 자바 클래스(Entity)를 만듭니다.
```java
@Entity // 이 클래스는 MySQL의 테이블이 될 거야! 라고 선언
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // AUTO_INCREMENT 기본키

    @Column(nullable = false, length = 50)
    private String email; // NOT NULL, VARCHAR(50)
}
```
`application.yml`의 `ddl-auto: update` 옵션 덕분에, 서버를 실행하는 순간 Spring Boot가 이 자바 코드를 스캔해서 알아서 SQL(`CREATE TABLE user ...`)을 만들어 MySQL로 전송합니다. 즉, 테이블 생성과 관리가 100% 자동화됩니다.

**2. 내용 저장/조회는 어떻게 수행하나요? (리포지토리 - Repository)**
데이터를 다룰 때도 SQL 쿼리문을 쓰지 않습니다. 대신 `Repository` 인터페이스를 만듭니다.
```java
public interface UserRepository extends JpaRepository<User, Long> {
}
```
실제 로직에서 데이터를 저장하고 싶다면, 자바 리스트에 데이터를 넣듯 직관적으로 코딩합니다.
```java
// 데이터 저장
User newUser = new User();
newUser.setEmail("hello@zariyo.com");
userRepository.save(newUser); // JPA가 알아서 INSERT 쿼리를 생성하여 실행

// 데이터 조회
User findUser = userRepository.findById(1L).get(); // 알아서 SELECT 쿼리 실행
```

**결론**: 자바 객체(Object)만 다루면, JPA가 알아서 SQL로 번역해 MySQL과 통신하는 것이 현대 백엔드 개발(Spring Boot)의 핵심 원리입니다.

---

### [2026-07-10 13:48] Q2. Docker 컨테이너의 백그라운드 실행 (Detached Mode)
**질문 (User)**:
"그러면 도커라는 프로그램에서 가상의 컨테이너를 통해 mysql과 redis 프로그램을 설치 없이 가상화 시스템 처럼 돌리고 이를 docker-compose.yml을 통해 작동방식을 정의 하는거네 그리고 mysql을 통한 저장은 자동으로 저장 되도록 설정한거고 그러면 터미널로 계속 열어둬야해?"

**답변 (Antigravity)**:
전체적인 흐름을 정확하게 100% 이해하셨습니다! 도커가 내부적으로 가상 환경을 만들어주고, JPA가 그 안의 MySQL과 통신하며 자동 저장을 수행합니다.

가장 중요한 '터미널을 계속 열어두어야 하는가?'에 대한 답변은 **"아니요, 터미널을 닫아도 됩니다!"** 입니다.

아까 우리가 실행했던 명령어를 다시 살펴보면 뒤에 `-d` 옵션이 붙어 있었습니다.
> `docker-compose up -d`

여기서 `-d`는 **Detached(분리된) 모드**의 약자입니다. 이 옵션을 넣고 실행하면, 도커 컨테이너들이 백그라운드(보이지 않는 뒤편)에서 실행되도록 분리됩니다. 따라서 명령어를 친 **터미널 창을 완전히 꺼버려도 MySQL과 Redis는 컴퓨터가 켜져 있는 한 뒤에서 계속 정상적으로 돌아갑니다.**

* 만약 백그라운드에서 돌아가는 도커 컨테이너들을 멈추고 싶다면 새로운 터미널을 열고 `docker-compose down`을 치면 됩니다.
* 현재 잘 돌아가고 있는지 확인하고 싶다면 `docker ps` 명령어를 치면 백그라운드에서 실행 중인 컨테이너 목록이 나옵니다.

---

### [2026-07-10 13:50] Q3. JPA의 저장 원리 (SQL 없이 형변환 시스템으로 저장되는가?)
**질문 (User)**:
"그러면 자바jpa와 스프링부트 시스템을 통해서 sql구문 없이 형변환 시스템으로 저장이 가능한거야? 이부분 과정 이나 로직 좀 더 설명해줘"

**답변 (Antigravity)**:
정확히 말하자면 **"SQL 구문이 아예 안 쓰이는 것은 아닙니다. 다만 개발자가 SQL을 직접 안 짜도 되도록 JPA가 자바 객체를 SQL로 '자동 번역(Mapping)'해서 쏴주는 것"**입니다. 이를 ORM(Object-Relational Mapping)이라고 합니다.

**[내부 동작 로직 3단계]**
1. **자바 객체 조작**: 개발자는 자바 세상에서 객체(Object)를 만듭니다. (`User user = new User("재현");`)
2. **JPA (Hibernate)의 개입**: `repository.save(user)`를 호출하면, Spring Boot 내부의 JPA(구현체: Hibernate)가 이 자바 객체를 가로챕니다.
3. **SQL 자동 생성 및 전송**: JPA는 "어? 자바 객체가 새로 들어왔네? 이 객체의 모양을 보니까 `user` 테이블에 넣으면 되겠군" 하고 판단한 뒤, 내부적으로 `INSERT INTO user (name) VALUES ('재현');` 이라는 **진짜 SQL 쿼리문을 자기가 직접 작성해서 MySQL로 전송**합니다.

즉, JPA는 개발자(자바)와 MySQL(SQL) 사이에서 완벽한 **동시통역사** 역할을 해주는 것입니다.

---

### [2026-07-10 13:50] Q4. 컴퓨터 재부팅 시 도커 컨테이너 재실행 여부
**질문 (User)**:
"이후에 종료했다가 다시 해당 프로젝트를 다시 개발한다고 하면 docker를 다시 활성화 해야하는건가? 프론트엔드 run 하는 거 처럼?"

**답변 (Antigravity)**:
**아니요, 프론트엔드처럼 매번 다시 켤 필요가 없습니다!**

아까 작성한 `docker-compose.yml` 파일 코드를 보면 맨 아래쪽에 이런 줄이 있었습니다.
> `restart: always`

이 옵션이 엄청난 마법을 부립니다.
1. 컴퓨터를 끄면 도커(MySQL, Redis)도 자연스럽게 같이 꺼집니다.
2. 내일 다시 **컴퓨터를 켜면, 도커 프로그램이 백그라운드에서 실행되면서 저 `always` 옵션을 보고 "아, 이 컨테이너들은 항상 켜져 있어야 하는 애들이지!" 하면서 자동으로 다시 `up` 시켜줍니다.**

따라서 재현님은 내일 컴퓨터를 켜시면 도커 쪽은 신경 끄고, 프론트엔드(`pnpm run dev`)와 나중에 만들 백엔드(Spring Boot Run)만 켜서 바로 개발을 이어가시면 됩니다. (단, 도커 서비스 자체가 부팅 시 자동 실행되도록 설정되어 있어야 합니다. 보통 Docker Desktop이나 리눅스 환경에서는 기본적으로 자동 실행됩니다.)

---

### [2026-07-10 13:51] Q5. 프로젝트 개발을 안 할 때도 도커가 항상 켜져 있는가?
**질문 (User)**:
"그러면 만약 내가 해당 프로젝트 코딩을 안 할대도 백그라운드에서 도커는 항상 켜지는거야?"

**답변 (Antigravity)**:
네, 맞습니다! `restart: always` 옵션 때문에 **컴퓨터를 켜면 코딩을 하든 안 하든 백그라운드에서 항상 켜져 있게 됩니다.**

만약 평소에 이 프로젝트를 개발하지 않을 때 컴퓨터의 메모리나 자원을 조금이라도 아끼고 싶으시다면 두 가지 방법이 있습니다.

1. **수동 종료 (권장)**: 개발이 끝나고 당분간 안 할 것 같을 때, 터미널을 열고 `ZariYo` 폴더에서 `docker-compose down`을 칩니다. 그러면 완전히 꺼지고 다음번 부팅 때도 켜지지 않습니다. 나중에 다시 개발할 때만 `docker-compose up -d`를 한 번 쳐주시면 됩니다.
2. **자동 실행 옵션 끄기**: 아예 처음부터 수동으로 켜고 싶으시다면, `docker-compose.yml` 파일에서 `restart: always` 줄을 지워버리시면 됩니다. 그러면 컴퓨터를 켤 때마다 매번 `docker-compose up -d`를 직접 쳐주셔야 합니다.

개인 PC 사양이 충분하시다면 켜두셔도 크게 무리는 없으나, 자원 관리를 원하신다면 개발 종료 시 `docker-compose down`으로 깔끔하게 꺼두는 습관을 들이는 것이 가장 좋습니다!

---

### [2026-07-10 13:57] Q6. 첫 JPA 엔티티(User) 작성 완료 및 코드 분석
**내용**:
개발자가 직접 타이핑한 `User.java` 엔티티 코드의 주요 어노테이션과 역할을 점검하고 학습했습니다.

**[주요 어노테이션 분석]**
* `@Entity`: 이 클래스가 MySQL의 테이블(`users`)과 매핑됨을 선언.
* `@Table(name = "users")`: DB 예약어 충돌을 막기 위해 테이블명을 명시적으로 지정.
* `@Id` & `@GeneratedValue(strategy = GenerationType.IDENTITY)`: 이 필드를 기본키(PK)로 지정하고, MySQL의 `AUTO_INCREMENT` 기능을 위임하여 값이 자동으로 1, 2, 3 늘어나도록 설정.
* `@Column(nullable = false, length = 50)`: `NOT NULL` 제약조건과 `VARCHAR(50)` 길이를 설정.
* `@Enumerated(EnumType.STRING)`: Enum 타입(ROLE_CUSTOMER 등)을 DB에 저장할 때, 숫자(0, 1)가 아닌 알아보기 쉬운 문자열 원문 그대로 저장하도록 강제하는 필수 옵션.

**[주의 사항 - Lombok의 @Getter]**
엔티티 작성 시 `@Getter` 어노테이션을 누락하면, 이후 서비스(Service) 계층에서 객체의 값을 꺼내올 수 없게 되므로(예: `user.getEmail()`) 반드시 포함해야 합니다. (이후 개발 과정에서 누락되었던 `@Getter`를 복구 조치 완료)

---

### [2026-07-10 14:02] Q7. JPA 객체 연관관계 매핑 (Store 엔티티의 @ManyToOne)
**내용**:
매장(`Store`) 엔티티를 작성하며 JPA의 핵심 기능 중 하나인 테이블 간의 외래키(FK) 연결을 자바 객체 참조로 매핑하는 방법을 학습했습니다.

**[연관관계 매핑 분석]**
```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id")
private User owner;
```
1. **`@ManyToOne`**: "여러 개의 매장(Many)은 한 명의 사장님(One)이 소유할 수 있다"는 다대일 관계를 명시합니다.
2. **`@JoinColumn(name = "user_id")`**: 데이터베이스의 `stores` 테이블에 생성될 외래키(Foreign Key) 컬럼의 이름을 지정합니다. (여기서는 `user_id`)
3. **`FetchType.LAZY` (지연 로딩)**: 실무에서 **무조건** 적용해야 하는 필수 성능 최적화 옵션입니다.
   - 만약 이 옵션이 없으면(Eager Loading), 매장 이름만 알고 싶어서 `store`를 가져올 때, JPA가 사장님의 정보(User)까지 강제로 DB에서 싹 다 긁어오게 되어 심각한 쿼리 성능 저하(N+1 문제)가 발생합니다.
   - `LAZY`를 걸어두면 매장 정보만 먼저 쏙 가져오고, 나중에 코드에서 `store.getOwner().getName()`처럼 진짜로 사장님 정보가 필요해진 그 순간에만 사장님 정보를 쿼리해서 가져옵니다.

---

### [2026-07-13 13:40] Q8. Spring Boot API의 아키텍처 흐름 (Controller - Service - Repository - DB)
**질문 (User)**:
"백엔드 API를 구축할 때 패키지가 여러 개로 쪼개지고 파일이 많아지는데, 전체적인 데이터 흐름과 각 역할이 어떻게 되는지 알고 싶어."

**답변 (Antigravity)**:
Spring Boot 백엔드 개발에서는 유지보수와 역할의 분리를 위해 **계층형 아키텍처(Layered Architecture)**를 사용합니다. 프론트엔드에서 API 요청을 보낸 후 DB를 거쳐 다시 응답을 받기까지 데이터는 다음의 4가지 레이어를 순서대로 통과합니다.

```mermaid
sequenceDiagram
    autonumber
    actor Client as 프론트엔드 (React)
    participant Controller as 컨트롤러 (Controller)
    participant Service as 서비스 (Service)
    participant Repository as 리포지토리 (Repository)
    participant DB as 데이터베이스 (MySQL / Redis)

    Client->>Controller: API 요청 전송 (JSON 데이터)
    Note over Controller: DTO를 통해 요청 데이터 바인딩
    Controller->>Service: 비즈니스 로직 호출 (DTO 전달)
    Note over Service: 핵심 비즈니스 연산 수행 & 트랜잭션 관리
    Service->>Repository: 데이터 접근 요청 (Entity 전달)
    Repository->>DB: SQL 쿼리 실행
    DB-->>Repository: 데이터 반환
    Repository-->>Service: Entity 객체 반환
    Note over Service: Entity를 Response DTO로 변환
    Service-->>Controller: DTO 반환
    Controller-->>Client: HTTP 응답 전송 (JSON 데이터)
```

#### 1. 각 레이어의 핵심 역할과 주석
* **Controller (컨트롤러)**:
  - **역할**: 외부(프론트엔드)의 요청을 받는 **문지기**입니다. 요청 주소(URL)와 HTTP Method(GET, POST 등)를 매핑하고, 들어온 JSON 데이터를 자바 객체(DTO)로 변환해 서비스에 넘겨줍니다.
  - **어노테이션**: `@RestController`, `@PostMapping`, `@GetMapping` 등
* **Service (서비스)**:
  - **역할**: 핵심 비즈니스 로직을 수행하는 **두뇌**입니다. "이미 예약된 좌석인가?", "5분이 지났는가?" 같은 논리적 흐름을 판단하고 제어합니다. 또한, `@Transactional`을 붙여 DB 작업들의 원자성(모두 성공하거나 실패 시 전체 취소)을 관리합니다.
* **Repository (리포지토리)**:
  - **역할**: 데이터베이스에 직접 접근하는 **수행 비서**입니다. JPA의 `JpaRepository` 인터페이스를 상속받으면 복잡한 SQL 작성 없이 조회, 저장, 삭제 메서드를 무료로 사용할 수 있습니다.
* **DTO (Data Transfer Object)**:
  - **역할**: 데이터가 레이어 간에 이동할 때 담기는 **택배 상자**입니다. DB 테이블 모양인 Entity를 그대로 화면에 노출하면 보안 및 구조적 문제가 생기므로, 딱 필요한 데이터만 담아 통신하기 위해 DTO를 사용합니다.

---

### [2026-07-13 13:45] Q9. Redisson 분산 락(Distributed Lock)을 이용한 동시성 제어 원리
**질문 (User)**:
"자리요의 핵심인 동시성 제어를 위해 Redisson 분산 락을 썼는데, 이게 무엇이고 어떤 원리로 여러 명의 중복 예약을 막는 거야? tryLock의 동작 방식도 궁금해."

**답변 (Antigravity)**:
동시성 제어는 **"동일한 좌석에 두 명 이상의 유저가 0.001초 차이로 동시에 클릭했을 때, 예약이 중복되는 것을 막는 기술"**입니다.

#### 1. 왜 분산 락이 필요한가?
만약 여러 대의 서버(WAS 클러스터)를 가동하는 대규모 서비스의 경우, 자바 언어 자체의 기본 동기화 기능(`synchronized`)은 개별 서버 메모리 안에서만 동작하므로 다른 서버에서 들어오는 요청을 제어하지 못합니다. 
따라서 여러 서버가 공통으로 바라보는 외부 메모리 저장소인 **Redis**를 중재자로 활용하여, **"이 좌석은 내가 먼저 찜했으니 다른 서버들은 대기하라"**고 잠금장치를 거는 것이 **분산 락(Distributed Lock)**입니다.

#### 2. Redisson 분산 락의 핵심 동작 방식 (`tryLock`)
우리가 작성한 `SeatService.java` 내의 분산 락 코드를 보며 설명하겠습니다.

```java
RLock lock = redissonClient.getLock("lock:seat:" + seatId);
acquired = lock.tryLock(5, 10, TimeUnit.SECONDS);
```

* **`"lock:seat:" + seatId`**: 좌석 고유의 ID를 기준으로 락의 이름을 지정합니다. 이렇게 하면 12번 좌석을 누른 사람과 13번 좌석을 누른 사람은 서로 대기하지 않고 각자 독립적으로 동작하므로 성능이 유지됩니다.
* **`tryLock(5, 10, TimeUnit.SECONDS)`**:
  - **대기 시간 (Wait Time - 5초)**: 락을 먼저 획득한 스레드가 있어서 실패했을 때, 포기하지 않고 최대 5초 동안 락이 풀리기를 기다리며 획득 시도를 반복합니다. (Redisson은 스핀 락 방식 대신 Redis Pub/Sub을 활용하여 대기하므로 Redis에 부하를 주지 않습니다.)
  - **임대 시간 (Lease Time - 10초)**: 락을 성공적으로 획득한 스레드가 비즈니스 로직을 수행하다가 에러가 나거나 서버가 다운되더라도, **10초가 지나면 무조건 락이 풀리도록 자동 설정**하여 전체 시스템이 락에 묶여 영원히 멈추는 **데드락(Deadlock)**을 방지합니다.

#### 3. 5분 임시 선점 (Redis TTL) 연동 시나리오
분산 락을 사용해 안전하게 임계 영역에 들어오면, Redis에 `seat:temp_occupied:{seatId}` 형태로 유저 ID를 저장하고 **TTL(Time To Live)을 300초(5분)**로 설정합니다.
1. **락 획득**: 유저 A가 락을 잡고 진입.
2. **검증**: Redis에 임시 선점 정보가 없고 DB에도 예약 확정이 없는 것을 확인.
3. **선점 등록**: Redis에 300초 만료 시간 조건으로 유저 A 정보 저장.
4. **락 해제**: 유저 A가 안전하게 락을 놓고 반환.
5. **유저 B의 접근**: 뒤늦게 들어온 유저 B는 분산 락을 잡고 들어와도, 이미 Redis에 유저 A의 선점 데이터(`held`)가 걸려있는 것을 검증 단에서 확인하고 실패하게 됨.

---

### [2026-07-13 15:35] Q10. 현업 개발자들의 API 테스트 방식과 도구
**질문 (User)**:
"실제 현업자들은 api테스트 어떤식으로해? 툴을 쓴다던지 SWAGGER를 쓴다던지 알려줘"

**답변 (Antigravity)**:
현업 백엔드 개발자들은 API의 개발 단계, 협업 상황, 테스트 자동화 여부에 따라 다양한 도구와 방식을 조합하여 사용합니다. 크게 4가지 방식으로 분류할 수 있습니다.

#### 1. Swagger / Springdoc OpenAPI (API 문서화 + 인터랙티브 테스트)
* **특징**: 백엔드 자바 코드를 스캔하여 자동으로 API 명세 웹페이지(Swagger UI)를 만들어 줍니다.
* **사용 용도**:
  - **프론트엔드 협업**: 프론트엔드 개발자에게 "이 주소로 이 형식으로 쏘시면 됩니다"라고 문서를 따로 쓸 필요 없이 Swagger 페이지 주소 하나로 소통합니다.
  - **간단한 브라우저 테스트**: 웹 화면에서 즉시 요청 파라미터를 입력하고 `Execute` 버튼을 눌러 응답 JSON을 시각적으로 확인해볼 수 있습니다.
* **현업 평**: 명세서 작성과 테스트가 동시에 해결되는 가장 대중적인 협업 필수 툴입니다.

#### 2. Postman / Insomnia (전문 API 클라이언트 툴)
* **특징**: API 요청을 수동으로 빌드하고 테스트할 수 있는 가장 대표적인 독립형 데스크톱 프로그램입니다.
* **사용 용도**:
  - **환경(Environment) 격리**: 로컬(`localhost`), 개발 서버(`dev.zariyo.com`), 실운영 서버(`zariyo.com`)용 도메인 및 헤더 설정을 변수화하여 마우스 클릭 한 번으로 테스트 대상을 스위칭합니다.
  - **체인 요청 (API Chaining)**: 로그인 API를 호출해 발급받은 JWT 토큰을 자동으로 추출하여 다음 API 요청 헤더에 알아서 넣어주는 자바스크립트 테스트 코드를 짤 수 있습니다.
  - **요청 컬렉션 저장**: API 명세를 저장해 두고 팀원들과 공유할 수 있습니다.

#### 3. JUnit + MockMvc / RestAssured (코드로 작성하는 자동화 테스트)
* **특징**: GUI 툴을 켜서 마우스로 누르는 게 아니라, 자바 테스트 코드를 짜서 백엔드 빌드 시점에 자동으로 API가 올바른 결과를 주어주는지 검증합니다.
* **사용 용도**:
  - **회귀 테스트(Regression Test)**: 소스코드를 대량으로 리팩토링하거나 변경했을 때, 기존 API 기능들이 망가지지 않았는지 1초 만에 수백 개의 API를 일제히 호출하여 통과 여부를 검증합니다.
  - **CI/CD 통합**: 깃허브에 코드를 올리면 서버가 빌드되기 전 자동으로 이 자바 테스트 코드들이 실행되어, 하나라도 실패하면 배포가 자동으로 중단되게 안전장치를 겁니다.

#### 4. VS Code REST Client (.http 파일 기반)
* **특징**: VS Code 확장 프로그램으로, 프로젝트 내부에 텍스트 파일(예: `test.http`)을 만들고 HTTP 요청 양식을 일반 텍스트로 적어두는 방식입니다.
* **사용 용도**:
  - **가볍고 빠른 테스트**: 무거운 Postman을 켜지 않고 에디터 내부에서 바로 `Send Request` 링크 버튼을 눌러 테스트 결과를 분할 화면으로 봅니다.
  - **버전 관리**: 텍스트 파일이므로 깃(Git)에 올려서 팀원들과 테스트용 요청 템플릿을 온전히 공유할 수 있습니다.

#### 💡 자리요(ZariYo) 프로젝트 추천안:
1. **코드 레벨 테스트**: 백엔드 빌드 환경의 안정성을 위해 `ZariYo-BackEnd`에 **JUnit + MockMvc**를 적용해 봅니다.
2. **문서화**: 백엔드 스프링 부트 프로젝트에 `springdoc-openapi-starter-webmvc-ui` 의존성을 추가해서 **Swagger UI**를 활성화하면 프론트엔드와 소통하거나 사용자가 직접 웹 브라우저 상에서 좌석 선점/예약 API를 클릭 테스트해 볼 수 있어 매우 편리합니다.

---

### [2026-07-13 15:40] Q11. Swagger를 이용한 백엔드 API 명세 자동화 및 실습 가이드
**질문 (User)**:
"swagger로 실습해보고 싶어 방법이랑 예제들 알려줘"

**답변 (Antigravity)**:
Spring Boot 3.x 환경에서 Swagger(OpenAPI 3)를 연동하고, 컨트롤러에 어노테이션을 활용해 문서를 고도화하는 방법과 실습 방법을 정리했습니다.

#### 1단계: 의존성(Dependency) 및 설정 추가
`build.gradle` 파일에 다음 라이브러리를 추가하고 프로젝트 의존성을 동기화(Refresh)합니다.
```groovy
// build.gradle
dependencies {
    // Swagger (OpenAPI 3) 의존성 추가
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0'
}
```

그 후, Swagger 명세서 상단에 표기될 정보를 설정하는 Configuration 클래스를 작성합니다.
```java
// com.zariyo.global.config.OpenApiConfig.java
package com.zariyo.global.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("자리요 (ZariYo) API 명세서")
                        .description("실시간 좌석 예약 및 5분 임시 선점 시스템 '자리요'의 백엔드 REST API 명세서입니다.")
                        .version("v1.0.0"));
    }
}
```

#### 2단계: 컨트롤러 어노테이션 적용 (명세서 데코레이팅)
API 가독성을 높이기 위해 컨트롤러 클래스와 개별 메서드(엔드포인트)에 OpenAPI 설명 어노테이션을 부착합니다.

* **`@Tag`**: 컨트롤러 클래스 상단에 부여하여 관련 API들을 하나의 카테고리로 묶어줍니다.
* **`@Operation`**: 각각의 API 핸들러 메서드 상단에 부여하여 API의 짧은 제목(`summary`)과 상세한 기능 설명(`description`)을 덧붙입니다.

**[적용 예시 (StoreController.java)]**
```java
@Tag(name = "Store API", description = "매장 설정 및 2D 캔버스 배치도 레이아웃 API")
@RestController
@RequestMapping("/api/v1/stores")
public class StoreController {

    @Operation(summary = "사장님 소유 매장 목록 조회", description = "특정 사장님(ownerId)이 등록한 매장 목록을 가져옵니다.")
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<StoreDto.Response>> getStoresByOwner(@PathVariable("ownerId") Long ownerId) {
        ...
    }
}
```

#### 3단계: Swagger UI를 통한 실습 및 테스트
1. **서브 구동**: 스프링 부트 백엔드 애플리케이션을 구동합니다.
2. **Swagger UI 페이지 접속**: 웹 브라우저를 열고 아래 주소로 접속합니다.
   ➔ **`http://localhost:8080/swagger-ui/index.html`**
3. **인터랙티브 실습 수행**:
   - 화면에 우리가 생성한 **Store API**, **Seat API**, **Auth API** 그룹들이 펼쳐집니다.
   - 테스트하려는 API(예: 사장님 소유 매장 목록 조회 - `GET /api/v1/stores/owner/{ownerId}`)를 클릭하여 세부 사양을 엽니다.
   - 우측의 **`Try it out`** 버튼을 클릭합니다.
   - 입력 폼이 활성화되면 경로 변수인 `ownerId` 칸에 테스트하고 싶은 값(예: `1`)을 입력합니다.
   - 하단의 파란색 **`Execute`** 버튼을 누릅니다.
   - 페이지 아래에 생성된 **`Responses`** 블록에서 서버로부터 반환받은 HTTP 상태 코드(200 OK 등)와 실제 가구 레이아웃 JSON 데이터 결과를 즉석에서 확인합니다.

---

### [2026-07-13 15:53] Q12. Swagger (OpenAPI 3) DTO @Schema 명세 및 @ApiResponse 응답 코드 고도화

**질문 (User)**:
"다시 swagger랑 api예제 구성해줘. DTO에 설명 추가하거나 응답 코드 설정하는 방법이랑 그 원리는 뭐야?"

**답변 (Antigravity)**:
기본적으로 Swagger는 자바 클래스와 컨트롤러의 메서드 시그니처만 스캔해서 빈 껍데기 문서를 만들어 줍니다. 하지만 실무에서는 프론트엔드 개발자가 API 문서만 보고도 "이 필드에는 어떤 값을 보내야 하는지", "에러가 나면 어떤 HTTP 상태 코드가 오는지" 한눈에 파악할 수 있어야 협업이 원활해집니다.

이를 위해 DTO와 컨트롤러에 **OpenAPI 상세 데코레이션 어노테이션**을 부착하여 명세를 고도화했습니다.

#### 1. DTO 필드에 예시와 설명 넣기 (`@Schema`)
자바 DTO의 멤버 변수에 `@Schema` 어노테이션을 부여하면, Swagger UI의 'Schemas' 탭이나 요청/응답 예시 바디에서 설명과 가짜 데이터를 노출해 줍니다.

```java
public static class SignupRequest {
    @Schema(description = "사용자 이메일 주소", example = "owner@zariyo.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Schema(description = "사용자 이름 또는 상호명", example = "홍길동", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "사용자 역할군 (ROLE_CUSTOMER, ROLE_OWNER)", example = "ROLE_OWNER")
    private Role role;
}
```

* **`description`**: 이 필드가 의미하는 바를 텍스트로 적어줍니다.
* **`example`**: 실제 전송될 법한 예시 값(mock data)을 적어줍니다. Swagger UI 상에서 'Try it out'을 누를 때 이 예시 데이터가 입력 폼에 자동으로 채워지므로 테스트가 매우 편리해집니다.
* **`requiredMode`**: 필수 값 여부를 규정하여 문서에 빨간색 아스테리스크(`*`) 기호로 필수 표시를 띄워줍니다.

#### 2. 발생 가능한 에러 응답 명세화 (`@ApiResponse` & `@ApiResponses`)
성공(200 OK)뿐만 아니라, 예외 상황에 대한 명세를 추가하면 프론트엔드에서 이에 대응하는 예외 처리 화면을 매핑하기가 수월해집니다.

```java
@Operation(summary = "좌석 5분 임시 선점 신청", description = "선택한 좌석을 다른 사용자가 점유할 수 없게 5분 동안 임시 선점(Redis Lock) 상태로 등록합니다.")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "임시 선점 결과 반환 (성공/실패 여부는 body 내 success 필드 참고)"),
    @ApiResponse(responseCode = "400", description = "유효하지 않은 파라미터 (좌석 ID 또는 회원 ID 누락)"),
    @ApiResponse(responseCode = "409", description = "이미 다른 요청에 의해 해당 좌석이 선점/점유된 경우")
})
@PostMapping("/reserve")
public ResponseEntity<SeatReservationDto.ReserveResponse> reserveSeatTemporary(@RequestBody SeatReservationDto.ReserveRequest request) {
    ...
}
```

* **`@ApiResponses`**: 여러 개의 가능한 응답 시나리오를 묶어줍니다.
* **`@ApiResponse`**: 특정 HTTP 상태 코드(`responseCode`)와 그 상황에 대한 요약 설명(`description`)을 엮어 문서에 표로 노출합니다.

#### 💡 기대 효과 및 실습 팁
이렇게 구성하면 `http://localhost:8080/swagger-ui/index.html`에 재접속했을 때,
1. **스마트한 입력 폼**: API 요청을 보낼 때 어떤 데이터를 JSON으로 채워 넣어야 하는지 견본 스키마가 `example` 값들로 가득 찬 채 완성되어 노출됩니다.
2. **명확한 예외 정보**: 어떤 사유로 400 에러나 409 에러가 일어날 수 있는지 API 규격서에 박제되어 소통 코스트가 0에 가깝게 절감됩니다.

---

### [2026-07-13 15:58] Q13. API와 비즈니스 로직의 개념 차이 및 Swagger 실습 시나리오 가이드

**질문 (User)**:
"이제 화면은 나오는데 이걸로 어떤 걸 보고 테스트해야 하는지 모르겠어. 그리고 API가 로직이라고 생각하면 되는 걸까?"

**답변 (Antigravity)**:
API와 비즈니스 로직은 밀접하지만 서로 다른 역할을 의미합니다. 백엔드 동작을 더 쉽게 이해하실 수 있도록 개념과 실제 Swagger 테스트 시나리오를 정리해 드립니다.

---

#### 1. API와 비즈니스 로직(Logic)의 차이점
* **API (Application Programming Interface - 창구)**:
  - **정의**: 시스템과 시스템(예: 프론트엔드와 백엔드)이 데이터를 주고받기 위한 **"약속된 통로"** 또는 **"주문 창구"**입니다.
  - **비유**: 식당의 **"카운터(주문 매대)와 메뉴판"**입니다. 손님이 메뉴판을 보고 "1번 테이블 주문이요" 하고 외치면, 카운터 직원이 주문을 받아서 주방으로 넘깁니다. API는 이 주문 접수 역할을 수행합니다.
* **비즈니스 로직 (Business Logic - 요리 과정)**:
  - **정의**: 프로그램이 실제로 비즈니스 목적을 달성하기 위해 돌아가는 **"알고리즘, 연산, 정책, 검증 규칙"**의 흐름입니다.
  - **비유**: 식당 주방에 있는 요리사의 **"조리 레시피와 요리 과정"**입니다. 주문이 들어왔을 때 "이 재료가 주방에 남아 있는가?(재고 검증)", "주문한 유저가 돈이 충분한가?(결제 검증)", "실제 음식을 구워낸다(데이터 처리)"와 같은 실제 백엔드의 내부 계산 작업이 로직입니다.
* **결론**: **"API(주문 창구)로 데이터를 집어넣으면, 그 안에서 비즈니스 로직(레시피)이 가동되어 데이터를 연산하고, 결과물을 다시 API 창구로 돌려준다"**고 이해하시면 완벽합니다!

---

#### 2. Swagger UI를 통한 자리요(ZariYo) 시나리오 테스트 가이드
Swagger UI 화면을 보면서 아래 5단계를 차례대로 누르며 테스트해보면, 프론트엔드와 백엔드가 내부적으로 어떻게 데이터를 교환하고 로직이 맞물리는지 명확하게 체험할 수 있습니다.

##### 1단계: 사장님과 손님 가입하기 (`Auth API` 그룹)
데이터베이스에 회원 데이터가 존재해야 매장을 등록하고 예약을 진행할 수 있습니다.
1. **`POST /api/v1/auth/signup`** (회원가입) 클릭 -> `Try it out` 클릭.
2. Request Body의 내용을 아래 사장님 데이터로 수정 후 `Execute` 실행:
   ```json
   {
     "email": "owner@zariyo.com",
     "name": "김사장",
     "role": "ROLE_OWNER"
   }
   ```
3. 성공 시 하단 Response에 사장님의 고유 ID(예: `id: 1`)가 발급되는지 확인합니다.
4. 똑같은 방식으로 손님(Customer) 회원가입도 진행합니다:
   ```json
   {
     "email": "customer@zariyo.com",
     "name": "이손님",
     "role": "ROLE_CUSTOMER"
   }
   ```
5. 손님의 고유 ID(예: `id: 2`)도 발급받아 기억합니다.

##### 2단계: 사장님의 매장 정보와 좌석 배치도 등록하기 (`Store API` 그룹)
가입한 사장님 ID(예: `1`)를 소유자로 매장을 등록하면서 2D 좌석 레이아웃을 일괄 저장합니다.
1. **`POST /api/v1/stores`** (매장 및 좌석 배치도 저장) 클릭 -> `Try it out` 클릭.
2. 아래 데이터를 참고하여 입력 폼을 채우고 실행합니다 (이때 `ownerId`에 방금 가입시킨 사장님 ID인 `1`을 대입합니다):
   ```json
   {
     "name": "자리요 강남역점",
     "address": "서울시 강남구 역삼동",
     "weekdayStart": "09:00",
     "weekdayEnd": "22:00",
     "ownerId": 1,
     "elements": [
       {
         "id": "seat-uuid-1111",
         "type": "table-2",
         "label": "1번 테이블",
         "x": 100,
         "y": 150,
         "width": 60,
         "height": 60,
         "isReservable": true,
         "isTempOccupiedEnabled": true
       }
     ]
   }
   ```
3. 성공 시 생성된 매장의 고유 ID(예: `id: 1`)가 응답으로 출력됩니다.

##### 3단계: 매장의 실시간 좌석 상태 조회하기 (`Seat API` 그룹)
방금 생성된 매장의 실시간 좌석들이 어떤 상태인지 조회해 봅니다.
1. **`GET /api/v1/seats`** (실시간 좌석 상태 목록 조회) 클릭 -> `Try it out` 클릭.
2. `storeId` 변수 칸에 매장 ID인 `1`을 입력하고 `Execute` 실행.
3. Response body에 아까 등록한 `"1번 테이블"`의 상태가 `"available"` (공석)으로 뜨고, `status` 정보가 정상적으로 노출되는지 확인합니다.

##### 4단계: 좌석 5분 임시 선점 신청하기 (`Seat API` 그룹)
손님 ID(예: `2`)를 사용해 `seat-uuid-1111` 좌석에 대해 5분 동안 잠금을 걸어 찜해 봅니다. (Redisson 분산 락 + Redis TTL 작동)
1. **`POST /api/v1/seats/reserve`** (좌석 5분 임시 선점 신청) 클릭 -> `Try it out` 클릭.
2. Body를 채우고 실행:
   ```json
   {
     "seatId": "seat-uuid-1111",
     "userId": 2
   }
   ```
3. 응답에 `"success": true`, `"timeLeft": 300` (남은 초), `"message": "5분 동안 좌석이 임시 선점되었습니다."` 가 출력되는지 확인합니다.
4. **[동시성 테스트]** 이 상태에서 `Execute` 버튼을 한 번 더 누르면, 이미 선점된 좌석이므로 `"success": false`와 함께 이미 선점되어 예약이 불가하다는 오류 메시지가 정상적으로 수신되는지 확인합니다.

##### 5단계: 결제 후 예약 최종 확정하기 (`Seat API` 그룹)
5분 임시 선점 시간 내에 결제 수단 입력을 마쳤다고 가정하고 최종 예약을 DB(MySQL)에 등록합니다.
1. **`POST /api/v1/seats/confirm`** (예약 최종 확정) 클릭 -> `Try it out` 클릭.
2. Body를 채우고 실행:
   ```json
   {
     "seatId": "seat-uuid-1111",
     "userId": 2,
     "peopleCount": 2
   }
   ```
3. 성공 시 DB에 최종 영속 예약이 생성되어 발급된 고유 예약 일련번호(`reservationId`)가 반환되는지 확인합니다.
4. 이후 다시 **`GET /api/v1/seats`**를 호출하여 해당 좌석 상태를 조회하면 `"status": "reserved"`로 상태가 실시간 갱신되어 있음을 확인하실 수 있습니다!

---

### [2026-07-13 16:07] Q14. Swagger UI 결과(Response) 확인 위치 및 DB 외래키(Foreign Key) 제약 조건

**질문 (User)**:
"Execute를 누르면 결과에 네가 말한 내용(success: true 등)은 없고 curl -X 'POST' ... 이런 텍스트만 보이는데, 내 컴퓨터 터미널에서 따로 결과 값을 확인해야 하는 거야?"

**답변 (Antigravity)**:
아닙니다! 브라우저 터미널이나 컴퓨터 명령창을 따로 확인하실 필요가 전혀 없습니다. Swagger UI 내부에서 실시간 결과 값을 확인하실 수 있습니다. 이 현상이 발생하는 이유는 **Swagger UI의 화면 구성 특성**과 **데이터베이스의 외래키 제약조건** 때문입니다.

#### 1. Swagger UI 결과 창 확인하는 법 (조금 더 아래로 스크롤!)
Swagger UI에서 `Execute` 버튼을 누르면 그 아래에 결과가 나타나는데, 영역이 두 가지로 쪼개져 있습니다.

* **`cURL` 영역 (유저분이 보신 영역)**:
  - "이 요청을 만약 검은색 터미널에서 리눅스 명령어로 쏜다면 이렇게 입력하시면 됩니다" 하고 템플릿 명령어 스니펫(`curl -X 'POST' ...`)을 보여주는 친절 보조용 영역입니다.
* **`Responses` 영역 (진짜 결과값이 나오는 영역)**:
  - **cURL 영역에서 마우스 스크롤을 살짝만 아래로 더 내리면** `Server response`와 함께 **`Response body`**라는 하얗거나 검은 텍스트 상자가 나옵니다.
  - 바로 그 `Response body` 안에 서버가 보낸 진짜 결과 JSON 데이터(`{"success": true, ...}`)가 들어 있습니다.

#### 2. 순서대로 하지 않았을 때 일어나는 에러 (DB 외래키 제약조건)
만약 `Response body` 영역을 찾았는데, 성공 메시지 대신 `500 Internal Server Error`나 붉은색 에러 텍스트가 적혀 있다면 **데이터의 선후 관계 규칙**이 깨졌기 때문입니다.

* **원인**: 좌석 예약(`Seat`)과 매장(`Store`), 회원(`User`)은 데이터베이스 상에서 **외래키(Foreign Key)**라는 강력한 실선으로 묶여 있습니다.
* **로직**: 존재하지 않는 손님 ID(`userId: 2`)나 존재하지 않는 좌석 ID(`seatId: "seat-uuid-1111"`)로 곧바로 4단계(임시 선점)를 실행하면, DB 엔진이 "어? 우리 회원 목록에는 2번 유저도 없고 좌석 목록에는 그런 UUID도 없는데 어떻게 억지로 락을 걸고 예약을 만드냐!" 하고 데이터 무결성 예외를 띄우며 요청을 거부합니다.
* **해결법**: 반드시 **1단계(회원가입) ➔ 2단계(매장등록 및 좌석 배치도 저장) ➔ 3단계(좌석 조회) ➔ 4단계(임시 선점)** 순서대로 차례차례 API를 쏘면서 DB에 실제 1번 사장님, 2번 손님, 그리고 좌석 UUID 데이터들을 한 단계씩 쌓아주셔야 정상 성공 응답을 얻을 수 있습니다.

---

### [2026-07-13 16:15] Q16. 전역 예외 처리(RestControllerAdvice)와 정적 팩토리 메서드(Static Factory Method)의 이점

**질문 (User)**:
"백엔드 코드를 리팩토링하면서 전역 예외 처리기랑 from 같은 정적 메서드들을 적용했는데, 이 개념들이 자바/스프링에서 왜 중요하고 어떤 점이 좋은지 설명해줘."

**답변 (Antigravity)**:
소프트웨어가 커지면 단순히 기능이 동작하는 것뿐만 아니라 **"코드가 얼마나 읽기 편한지(가독성)"**와 **"에러 상황에 얼마나 우아하게 대처하는지(견고함)"**가 중요한 유지보수 척도가 됩니다. 이번 리팩토링에서 도입한 두 가지 핵심 개념의 원리와 효과는 다음과 같습니다.

---

#### 1. 전역 예외 처리기 (`@RestControllerAdvice`)
이전 코드에서는 예외가 발생하면 자바 표준 예외(`IllegalArgumentException`)가 그대로 던져져 브라우저에 불친절한 500 에러 스택 정보가 그대로 반환되었습니다. 

* **동작 원리**: 
  - 스프링 부트 애플리케이션의 모든 컨트롤러에서 던지는 예외를 공중에서 가로채는 **"중앙 예외 관제탑"**을 세우는 것입니다.
  - `@RestControllerAdvice` 클래스가 모든 API 요청 길목을 지키고 있다가, 예외가 감지되면 즉시 가로채어 규격화된 에러 객체인 `ErrorResponse` JSON 데이터로 변환해 리턴합니다.
* **이점**:
  - **프론트엔드 연동 편리성**: 성공 시에는 `{"success": true, ...}`, 에러 시에는 `{"success": false, "message": "에러내용"}`으로 언제나 **일관된 응답 뼈대**가 보장되므로 프론트엔드가 수월하게 예외 팝업창을 띄울 수 있습니다.
  - **보안성 향상**: 서버 코드의 줄 번호나 클래스 명칭이 고스란히 담긴 에러 스택 트레이스(Error Stack Trace)가 외부 유저에게 노출되는 보안 취약점을 완전히 은닉합니다.
  - **컨트롤러 슬림화**: 개별 컨트롤러 메서드마다 `try-catch` 블록을 주렁주렁 달 필요가 없어져 코드가 매우 간결해집니다.

---

#### 2. DTO 정적 팩토리 메서드 패턴 (`from` 메서드)
기존에는 서비스 계층에서 DB 엔티티 데이터를 조회한 뒤 아래와 같이 직접 DTO 생성자를 호출했습니다.
`new UserDto.Response(user.getId(), user.getEmail(), user.getName(), user.getRole().name())`

* **동작 원리**:
  - 생성자(`new`)를 직접 호출해 인스턴스를 만드는 방식 대신, 클래스 내부에 **자신을 직접 생성해서 반환해주는 `static` 메서드**를 심어두는 객체지향 디자인 기법입니다.
  - DTO 내부에 `public static Response from(User user)`를 만들어 데이터 변환 로직을 캡슐화합니다.
* **이점**:
  - **관심사의 분리 (Separation of Concerns)**: "엔티티의 어떤 컬럼을 DTO의 어떤 필드에 맵핑할 것인가" 하는 조립 규칙은 DTO 스스로가 알고 있는 것이 맞습니다. 서비스 레이어는 비즈니스 흐름 제어에만 신경 쓰도록 책임을 명확히 합니다.
  - **코드 다이어트**: 서비스 단의 소스코드 줄 수가 비약적으로 줄어듭니다. `return UserDto.Response.from(user);` 한 줄로 매핑 작업이 단축됩니다.
  - **이름을 가질 수 있는 생성 방식**: 생성자는 무조건 클래스 이름으로만 호출해야 하지만, 정적 메서드는 `from()`, `of()`, `createWithDefault()` 등 이름을 다양하게 지어 생성 목적과 문맥을 코드로 명확히 표현할 수 있습니다.
