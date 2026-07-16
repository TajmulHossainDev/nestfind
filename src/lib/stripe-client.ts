export async function redirectToCheckout(
  listingId: string,
  checkIn: string,
  checkOut: string,
) {
  const { api } = await import("@/lib/api");
  const data = await api.post<{ url: string }>("/bookings/checkout", {
    listingId,
    checkIn,
    checkOut,
  });

  if (data.url) {
    window.location.href = data.url;
  }
}
