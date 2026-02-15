import type { ImmutableEntity } from './immutable_entity';

/**
 * Interface for entities that can be updated after creation.
 * Extends ImmutableEntity by adding update tracking.
 *
 * @template TId - The type of the entity identifier (defaults to string)
 *
 * @extends {ImmutableEntity<TId>}
 *
 * @property {Date} updatedAt - Timestamp of the last update to the entity
 */
export interface UpdatableEntity<TId = string> extends ImmutableEntity<TId> {
    /**
     * Timestamp of the last update to the entity
     */
    updatedAt: Date;
}
