import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sanpham } from '../../Admin/sanpham/sanpham.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems';
  private cartItems: Sanpham[] = [];
  private cartItemsSubject = new BehaviorSubject<Sanpham[]>(this.cartItems);

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedItems = localStorage.getItem('cartItems');
      if (storedItems) {
        this.cartItems = JSON.parse(storedItems);
        this.cartItemsSubject.next(this.cartItems);
      }
    }
  }

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.gia * item.soluong), 0);
  }

  addToCart(item: Sanpham, selectedQuantity: number) {
    const existingItem = this.cartItems.find(cartItem => cartItem.masp === item.masp);
    if (existingItem) {
      // If the product already exists in the cart, increase the quantity by the selected quantity
      existingItem.soluong += selectedQuantity;
    } else {
      // If the product does not exist in the cart, add it with the selected quantity
      item.soluong = selectedQuantity;
      this.cartItems.push(item);
    }
    // Store the updated cart in localStorage (check if localStorage is available)
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    // Notify subscribers of the updated cart
    this.cartItemsSubject.next(this.cartItems);
    console.log('Current Cart Items:', this.cartItems); // Log the updated cart items
  }

  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.masp !== itemId);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); // Update localStorage
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('cartItems'); // Clear cart from localStorage
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  decrementQuantity(itemId: number) {
    const existingItem = this.cartItems.find(item => item.masp === itemId);
    if (existingItem) {
      if (existingItem.soluong > 1) {
        existingItem.soluong -= 1;
      } else {
        this.removeFromCart(itemId); // If quantity is 1, remove from cart
      }
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); // Update localStorage
      }
      this.cartItemsSubject.next(this.cartItems);
    }
  }
  // Method to update product quantity
  updateProductQuantity(masp: number, quantity: number): void {
    const cartItems: Sanpham[] = this.getCartItemsFromSession();

    const itemIndex = cartItems.findIndex(item => item.masp === masp);
    if (itemIndex > -1) {
      cartItems[itemIndex].soluong -= quantity; // Decrease the quantity

      if (cartItems[itemIndex].soluong <= 0) {
        // Optionally remove the item from the cart if quantity is 0 or less
        cartItems.splice(itemIndex, 1);
      }

      // Save the updated cart back to session storage
      this.saveCartItemsToSession(cartItems);
    }
  }
  private getCartItemsFromSession(): Sanpham[] {
    const items = sessionStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  private saveCartItemsToSession(cartItems: Sanpham[]): void {
    sessionStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }
}
