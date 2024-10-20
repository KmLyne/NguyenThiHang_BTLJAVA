package com.example.Test.controller;

import com.example.Test.model.Cart;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody Cart cartItem, HttpSession session) {
        if (cartItem == null || cartItem.getMasp() <= 0 || cartItem.getSoluong() <= 0) {
            return ResponseEntity.badRequest().body("Invalid product data.");
        }

        List<Cart> cart = (List<Cart>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
        }

        cart.add(cartItem);
        session.setAttribute("cart", cart);

        return ResponseEntity.ok("Sản phẩm đã được thêm vào giỏ hàng!");
    }

    // Retrieving all items in the cart
    @GetMapping
    public ResponseEntity<List<Cart>> getCart(HttpSession session) {
        List<Cart> cart = (List<Cart>) session.getAttribute("cart");
        return ResponseEntity.ok(cart != null ? cart : new ArrayList<>());
    }

    // Removing all items from the cart
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(HttpSession session) {
        // Clear the cart from the session
        session.removeAttribute("cart");
        return ResponseEntity.ok("Giỏ hàng đã được xóa!");
    }
}
