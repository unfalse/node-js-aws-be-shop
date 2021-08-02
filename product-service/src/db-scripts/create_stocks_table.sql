CREATE TABLE Stocks (
  product_id UUID,
  count integer,
  CONSTRAINT stocks_fk FOREIGN KEY (product_id) REFERENCES public.products(id) on delete cascade
);
