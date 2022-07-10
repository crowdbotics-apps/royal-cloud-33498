PRODUCT_TYPE = (
    ('Catalog', 'Catalog'),
    ('Inventory', 'Inventory')
)

STATUS_TYPE = (
    ('Unmatched', 'Unmatched'),
    ('Pending', 'Pending'),
    ('Confirmed', 'Confirmed'),
    ('Completed', 'Completed')
)

ORDER_STATUS_TYPE = (
    ('Pending', 'Pending'),
    ('Completed', 'Completed')
)

SIZE_TYPE = (
    ('S', 'S'),
    ('M', 'M'),
    ('L', 'L')
)

SIZE_VARIANCE = (
    ('2S 2M 2L', '2S 2M 2L'),
    ('2S 2M 2L 2XL', '2S 2M 2L 2XL'),
    ('2XS 2S 2M 2L 2XL', '2XS 2S 2M 2L 2XL'),
    ('2XXS 2XS 2S 2M 2L 2XL', '2XXS 2XS 2S 2M 2L 2XL'),
    ('2XL 2XXL 2XXL', '2XL 2XXL 2XXXL'),
    ('1 3 5 7 9 11 13', '1 3 5 7 9 11 13'),
    ('0 1 3 5 7 9 11 13', '0 1 3 5 7 9 11 13'),
    ('14 16 18 20 22', '14 16 18 20 22')
)