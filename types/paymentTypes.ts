

export type PaymentStatusType = "SUCCESS" | "PENDING" | "FAILED";

export type PaymentHistoryType = {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatusType;
  createdAt: string;
  plan?: string;
};




export type CashfreeOrderType = {
  cart_details: any | null;
  cf_order_id: string;
  created_at: string;
  customer_details: {
    customer_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_uid: string | null;
  };
  entity: "order";
  order_amount: number;
  order_currency: string;
  order_expiry_time: string;
  order_id: string;
  order_meta: {
    notify_url: string | null;
    payment_methods: string | null;
    payment_methods_filters: string | null;
    return_url: string;
  };
  order_note: string;
  order_splits: any[];
  order_status: "ACTIVE" | "PAID" | "EXPIRED" | "TERMINATED" | string;
  order_tags: Record<string, any> | null;
  payment_session_id: string;
  products: {
    one_click_checkout: {
      enabled: boolean;
      conditions: any[];
    };
    verify_pay: {
      enabled: boolean;
      conditions: any[];
    };
  };
  terminal_data: any | null;
}


export type PaymentStatusConfigType = {
  icon: React.ReactNode;
  title: string;
  description: string;
  note: string;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
  badgeLabel: string;
  iconBg: string;
  iconColor: string;
  ringColor: string;
}
