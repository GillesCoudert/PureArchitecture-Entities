import type { ImmutableEntity } from './immutable_entity';

/**
 * Interface for entities that support soft deletion.
 * Soft deleted entities are marked as removed but not physically deleted from storage.
 *
 * @template TId - The type of the entity identifier (defaults to string)
 *
 * @extends {ImmutableEntity<TId>}
 *
 * @property {Date} removedAt - Timestamp when the entity was soft deleted
 */
export interface SoftRemovableEntity<
    TId = string,
> extends ImmutableEntity<TId> {
    /**
     * Timestamp when the entity was soft deleted
     */
    removedAt: Date;
}
