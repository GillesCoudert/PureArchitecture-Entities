import type { Repository } from '@gilles-coudert/pure-architecture';
import type { Requester } from '@gilles-coudert/pure-architecture';
import type { ImmutableEntity } from '../../domain/immutable_entity';

/**
 * Repository interface for immutable entities.
 * Immutable entities can only be created, read, and optionally deleted, but not updated.
 *
 * This repository extends the base Repository interface and explicitly forbids
 * update operations. SoftDelete and restore are also forbidden as they are
 * specific to SoftRemovableEntity.
 *
 * @template TRequester - The type of the requester (user/system making the request)
 * @template TEntity - The immutable entity type (must extend ImmutableEntity)
 * @template TAccessPolicy - The type of access control policy applied to this entity
 * @template TId - The type of the entity identifier (defaults to string)
 *
 * @extends {Repository<TRequester, TEntity, TId>}
 */
export interface ImmutableEntityRepository<
    TRequester extends Requester,
    TEntity extends ImmutableEntity<TAccessPolicy, TId>,
    TAccessPolicy = undefined,
    TId = string,
> extends Repository<TRequester, TEntity, TId> {
    // Explicitly forbid update on immutable entities
    update?: never;
    // SoftDelete and restore are specific to SoftRemovableEntity
    softDelete?: never;
    restore?: never;
}
