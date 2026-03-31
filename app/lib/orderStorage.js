"use client";

const ORDER_STORAGE_KEY = "quickbites-orders";

export function getStoredOrders() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedOrders = window.localStorage.getItem(ORDER_STORAGE_KEY);
    return storedOrders ? JSON.parse(storedOrders) : [];
  } catch (error) {
    console.error("Failed to read stored orders:", error);
    return [];
  }
}

export function storeOrder(order) {
  if (typeof window === "undefined") {
    return null;
  }

  const nextOrder = {
    ...order,
    id: order.id || `QB-${Date.now()}`,
    createdAt: order.createdAt || new Date().toISOString(),
  };

  const existingOrders = getStoredOrders();
  window.localStorage.setItem(
    ORDER_STORAGE_KEY,
    JSON.stringify([nextOrder, ...existingOrders])
  );

  return nextOrder;
}

export function getLatestOrder() {
  return getStoredOrders()[0] || null;
}

export function getOrderProgress(order, now = Date.now()) {
  if (!order?.createdAt) {
    return {
      currentStep: 0,
      label: "Order placed",
      steps: ["Order placed", "Preparing", "Picked up", "On the way", "Delivered"],
    };
  }

  const steps = ["Order placed", "Preparing", "Picked up", "On the way", "Delivered"];
  const elapsedMinutes = Math.max(
    0,
    Math.floor((now - new Date(order.createdAt).getTime()) / 60000)
  );

  let currentStep = 0;
  if (elapsedMinutes >= 3) currentStep = 1;
  if (elapsedMinutes >= 8) currentStep = 2;
  if (elapsedMinutes >= 15) currentStep = 3;
  if (elapsedMinutes >= 25) currentStep = 4;

  return {
    currentStep,
    label: steps[currentStep],
    steps,
  };
}
