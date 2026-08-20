/** Rupee amounts always use Indian digit grouping — ₹1,40,000, never ₹140,000. */
export const money = (n: number) => "₹" + n.toLocaleString("en-IN");

export const digitsOnly = (v: string, max: number) => v.replace(/\D/g, "").slice(0, max);
