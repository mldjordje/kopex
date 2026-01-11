CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  category VARCHAR(255) NULL,
  summary TEXT NULL,
  description TEXT NULL,
  hero_image VARCHAR(1024) NULL,
  gallery_images TEXT NULL,
  documents TEXT NULL,
  seo_title VARCHAR(255) NULL,
  seo_description VARCHAR(500) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY idx_products_slug (slug),
  KEY idx_products_active_sort (is_active, sort_order, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
