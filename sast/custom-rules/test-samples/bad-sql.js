// TEST SAMPLE — should trigger juice-shop-sql-injection rule
const userId = req.params.id;
db.query("SELECT * FROM users WHERE id = " + userId);
