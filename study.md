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
