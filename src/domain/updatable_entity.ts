import type { ImmutableEntity } from './immutable_entity';

/**
 * Interface for entities that can be updated after creation.
 * Extends ImmutableEntity by adding update tracking.
 *
 * @template TAccessPolicy - The type of access control policy applied to this entity
 * @template TId - The type of the entity identifier (defaults to string)
 *
 * @extends {ImmutableEntity<TAccessPolicy, TId>}
 *
 * @property {Date} updatedAt - Timestamp of the last update to the entity
 */
export interface UpdatableEntity<
    TAccessPolicy = undefined,
    TId = string,
> extends ImmutableEntity<TAccessPolicy, TId> {
    /**
     * Timestamp of the last update to the entity
     */
    updatedAt: Date;
}
