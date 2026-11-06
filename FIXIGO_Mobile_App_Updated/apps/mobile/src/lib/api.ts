const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

export type CreateServiceRequestInput = {
  customer_id: string;
  description: string;
  category_id?: string;
  address_id?: string;
  urgency?: "low" | "normal" | "high" | "emergency";
};

export type ServiceRequest = CreateServiceRequestInput & {
  request_id: string;
  status: string;
  created_at: string;
};

export async function createServiceRequest(
  input: CreateServiceRequestInput
): Promise<ServiceRequest> {
  const response = await fetch(`${API_BASE_URL}/requests/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API error: ${response.status}`);
  }

  return response.json() as Promise<ServiceRequest>;
}
