import { z } from 'zod';

export const ZoningFilterSchema = z.object({
  city: z.enum(['Charlotte', 'Raleigh']),
  filters: z.object({
    zoning_districts: z.array(z.string()).optional(),
    min_lot_size: z.number().optional(),
    max_lot_size: z.number().optional(),
    overlays: z.array(z.string()).optional(),
    opportunity_zone: z.boolean().optional(),
    proximity_to_transit: z.number().optional(),
  }),
  boundary: z
    .object({
      center: z
        .object({
          lat: z.number(),
          lng: z.number(),
        })
        .optional(),
      radius: z.number().optional(),
      neighborhood: z.string().optional(),
    })
    .optional(),
});

export type ZoningFilterRequest = z.infer<typeof ZoningFilterSchema>;