CREATE TABLE Products (
    id UUID primary key,
    title varchar(255) NOT NULL,
    description varchar(255),
    price integer,
    img_url varchar(255)
);
