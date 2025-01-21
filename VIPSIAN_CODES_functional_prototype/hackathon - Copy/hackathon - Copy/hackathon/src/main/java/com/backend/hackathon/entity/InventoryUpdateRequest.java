package com.backend.hackathon.entity;


public class InventoryUpdateRequest {

	private Long productId;
	
	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	private int quantity;
	
	private String reason; //eg - "Order" , "Return" , "Manual Adjustment"
}
