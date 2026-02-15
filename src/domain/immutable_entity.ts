/**
 * Base interface for immutable entities in a Pure Architecture domain.
 * Immutable entities cannot be modified after creation.
 *
 * @template TId - The type of the entity identifier (defaults to string)
 *
 * @property {TId} id - Unique identifier for the entity
 * @property {Date} createdAt - Timestamp when the entity was created
 */
export interface ImmutableEntity<TId = string> {
    /**
     * Unique identifier for the entity
     */
    id: TId;

    /**
     * Timestamp when the entity was created
     */
    createdAt: Date;
}
