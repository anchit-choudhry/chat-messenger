mysql -u root -e "CREATE USER IF NOT EXISTS 'chat_app'@'localhost' IDENTIFIED BY 'lets_talk';"
mysql -u root -e "CREATE DATABASE IF NOT EXISTS chat_app";
mysql -u root -e "GRANT ALL PRIVILEGES ON chat_app.* TO 'chat_app'@'localhost';"
mysql -u root chat_app -e "CREATE TABLE IF NOT EXISTS user_info ( user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, username VARCHAR(30) NOT NULL UNIQUE, password CHAR(128) NOT NULL, email VARCHAR(50) NOT NULL UNIQUE, last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP, session CHAR(36) );"
mysql -u root chat_app -e "CREATE TABLE IF NOT EXISTS messages ( id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, sender_id VARCHAR(30) NOT NULL, message TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL, message_time TIMESTAMP NOT NULL, FOREIGN KEY (sender_id) REFERENCES user_info(username) ON DELETE CASCADE );"
mysql -u root chat_app -e "CREATE INDEX messages_time_index USING BTREE ON messages(message_time DESC);"
