/**
 * Base interface for immutable entities in a Pure Architecture domain.
 * Immutable entities cannot be modified after creation.
 *
 * @template TAccessPolicy - The type of access control policy applied to this entity
 * @template TId - The type of the entity identifier (defaults to string)
 *
 * @property {TId} id - Unique identifier for the entity
 * @property {Date} createdAt - Timestamp when the entity was created
 * @property {TAccessPolicy} accessPolicy - Access control policy for this entity
 */
export interface ImmutableEntity<TAccessPolicy = undefined, TId = string> {
    /**
     * Unique identifier for the entity
     */
    id: TId;

    /**
     * Timestamp when the entity was created
     */
    createdAt: Date;

    /**
     * Access control policy for this entity
     */
    accessPolicy: TAccessPolicy;
}
