import { ValueTransformer } from 'typeorm';

// pg returns NUMERIC/DECIMAL columns as strings to avoid precision loss.
// Prices fit safely into a JS number, so convert them back.
export const decimalTransformer: ValueTransformer = {
  to: (value?: number | null) => value,
  from: (value?: string | null) =>
    value === null || value === undefined ? value : Number(value),
};
