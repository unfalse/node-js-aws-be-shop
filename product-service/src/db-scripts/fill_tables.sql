INSERT INTO public.products
(id, title, description, price, img_url)
VALUES
('03b65936-77a8-48ec-8fe8-d7b4b0de5a68', 'Чайник BOSCH', 'Чайник компании BOSCH', 2.4, 'https://images.unsplash.com/photo-1530049625133-46d513586ab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80'),
('b8d6c14c-db9b-4fab-8873-ec756c310b87', 'Чайник VITEK', 'Чайник компании VITEK', 10, 'https://images.unsplash.com/photo-1530049625133-46d513586ab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80'),
('fe7ea1b8-d86e-4b40-aaa0-569ed47c92ea', 'Чайник TEFAL', 'Чайник компании TEFAL', 23, 'https://images.unsplash.com/photo-1530049625133-46d513586ab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80'),
('ebe0f9eb-ed19-4f9a-b60a-0ac6cec416fb', 'Чайник Xiaomi Mi Smart Kettle Pro', 'Чайник компании Xiaomi Mi Smart Kettle Pro', 15, 'https://images.unsplash.com/photo-1530049625133-46d513586ab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80'),
('ded54c64-fd15-4c48-a4d5-7d3fa40b0fdf', 'Чайник Kitfort', 'Чайник компании Kitfort', 23, 'https://images.unsplash.com/photo-1530049625133-46d513586ab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80'),
('788ba723-da4e-48f6-ac85-ad7a6aa1a1c1', 'Чайник Philips', 'Чайник компании Philips', 15, 'https://images.unsplash.com/photo-1530049625133-46d513586ab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80'),
('1e627d94-d1e2-493c-a2e1-a433ee1a56ef', 'Чайник REDMOND', 'Чайник компании REDMOND', 31, 'https://images.unsplash.com/photo-1530049625133-46d513586ab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80'),
('e9f0bbc1-84f9-420c-9dbe-6a8ff6ceb1ba', 'Чайник De''Longhi', 'Чайник компании De''Longhi', 40, 'https://images.unsplash.com/photo-1530049625133-46d513586ab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80');

INSERT INTO public.stocks
(product_id, count)
VALUES
('03b65936-77a8-48ec-8fe8-d7b4b0de5a68', 4),
('b8d6c14c-db9b-4fab-8873-ec756c310b87', 3),
('fe7ea1b8-d86e-4b40-aaa0-569ed47c92ea', 6),
('ebe0f9eb-ed19-4f9a-b60a-0ac6cec416fb', 5),
('ded54c64-fd15-4c48-a4d5-7d3fa40b0fdf', 7),
('788ba723-da4e-48f6-ac85-ad7a6aa1a1c1', 2),
('1e627d94-d1e2-493c-a2e1-a433ee1a56ef', 1),
('e9f0bbc1-84f9-420c-9dbe-6a8ff6ceb1ba', 30);
