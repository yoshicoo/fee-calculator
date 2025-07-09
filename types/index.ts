export interface Agent {
  id: string;
  name: string;
  abbreviation?: string;
  fee_rate: number;
  created_at?: string;
  updated_at?: string;
}

export interface CalculationResult {
  agent: Agent;
  annual_salary: number;
  fee_amount: number;
}
