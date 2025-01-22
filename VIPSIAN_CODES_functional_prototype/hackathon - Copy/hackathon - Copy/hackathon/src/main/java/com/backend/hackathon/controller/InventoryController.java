package com.backend.hackathon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.hackathon.entity.InventoryUpdateRequest;
import com.backend.hackathon.entity.Product;
import com.backend.hackathon.service.InventoryService;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

	@Autowired
	private InventoryService inventoryService;
	
	@PostMapping("/add")
	public ResponseEntity<Product> addProduct(@RequestBody Product product){
		
		return ResponseEntity.ok(inventoryService.addProduct(product));
		
	}
	
	public ResponseEntity<String> updateStock(@RequestBody InventoryUpdateRequest request){
		  try {
	            inventoryService.updateStock(request.getProductId(), request.getQuantity());
	            return ResponseEntity.ok("Stock updated successfully");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	        }
}


}
