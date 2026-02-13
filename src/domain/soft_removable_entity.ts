import type { UpdatableEntity } from './updatable_entity';

/**
 * Interface for entities that support soft deletion.
 * Soft deleted entities are marked as removed but not physically deleted from storage.
 *
 * @template TAccessPolicy - The type of access control policy applied to this entity
 * @template TId - The type of the entity identifier (defaults to string)
 *
 * @extends {UpdatableEntity<TAccessPolicy, TId>}
 *
 * @property {Date} removedAt - Timestamp when the entity was soft deleted
 */
export interface SoftRemovableEntity<
    TAccessPolicy = undefined,
    TId = string,
> extends UpdatableEntity<TAccessPolicy, TId> {
    /**
     * Timestamp when the entity was soft deleted
     */
    removedAt: Date;
}
