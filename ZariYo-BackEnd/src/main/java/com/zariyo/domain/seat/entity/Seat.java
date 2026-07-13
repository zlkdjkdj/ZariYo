package com.zariyo.domain.seat.entity;

import com.zariyo.domain.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 매장 내의 개별 좌석 및 배치 가구 요소를 나타내는 데이터베이스 엔티티입니다.
 * 프론트엔드의 PlacedElement 인터페이스 정보와 매핑됩니다.
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "seats")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String elementId; // 프론트엔드에서 생성된 고유 UUID 식별 키

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SeatType type;

    private String label;

    private int x;
    private int y;
    private int width;
    private int height;

    private boolean isReservable;
    private boolean isTempOccupiedEnabled;

    public Seat(String elementId, Store store, SeatType type, String label, int x, int y, int width, int height, boolean isReservable, boolean isTempOccupiedEnabled) {
        this.elementId = elementId;
        this.store = store;
        this.type = type;
        this.label = label;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isReservable = isReservable;
        this.isTempOccupiedEnabled = isTempOccupiedEnabled;
    }

    public void updateLayout(String label, int x, int y, int width, int height, boolean isReservable, boolean isTempOccupiedEnabled) {
        this.label = label;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isReservable = isReservable;
        this.isTempOccupiedEnabled = isTempOccupiedEnabled;
    }

    public enum SeatType {
        TABLE_2, TABLE_4, TABLE_BAR, SOCKET, DOOR, TOILET, COUNTER;

        public static SeatType fromString(String typeStr) {
            switch (typeStr) {
                case "table-2": return TABLE_2;
                case "table-4": return TABLE_4;
                case "table-bar": return TABLE_BAR;
                case "socket": return SOCKET;
                case "door": return DOOR;
                case "toilet": return TOILET;
                case "counter": return COUNTER;
                default: throw new IllegalArgumentException("지원하지 않는 좌석 타입입니다: " + typeStr);
            }
        }

        public String toFrontendString() {
            switch (this) {
                case TABLE_2: return "table-2";
                case TABLE_4: return "table-4";
                case TABLE_BAR: return "table-bar";
                case SOCKET: return "socket";
                case DOOR: return "door";
                case TOILET: return "toilet";
                case COUNTER: return "counter";
                default: return name().toLowerCase();
            }
        }
    }
}
