package com.backend.hackathon.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.hackathon.entity.Product;

public interface ProductRepository extends JpaRepository<Product , Long>{

	
	
	List<Product> findByCategory(String category);
}
