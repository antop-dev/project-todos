CREATE TABLE "todos"
(
    id CHAR(36) NOT NULL,
    title TEXT NOT NULL,
    done BOOLEAN DEFAULT false NOT NULL,
    order_no int DEFAULT 0
);
