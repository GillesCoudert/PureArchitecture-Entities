import type { Repository } from '@gilles-coudert/pure-architecture';
import type { Requester } from '@gilles-coudert/pure-architecture';
import type { UpdatableEntity } from '../../domain/updatable_entity';

/**
 * Repository interface for updatable entities.
 * Updatable entities can be created, read, updated, and optionally deleted.
 *
 * This repository extends the base Repository interface, makes update mandatory,
 * and explicitly forbids softDelete and restore operations (specific to SoftRemovableEntity).
 *
 * @template TRequester - The type of the requester (user/system making the request)
 * @template TEntity - The updatable entity type (must extend UpdatableEntity)
 * @template TId - The type of the entity identifier (defaults to string)
 *
 * @extends {Repository<TRequester, TEntity, TId>}
 */
export interface UpdatableEntityRepository<
    TRequester extends Requester,
    TEntity extends UpdatableEntity<TId>,
    TId = string,
> extends Omit<Repository<TRequester, TEntity, TId>, 'update'> {
    /**
     * Updates an existing entity
     */
    update: Required<Repository<TRequester, TEntity, TId>>['update'];

    // SoftDelete and restore are specific to SoftRemovableEntity
    softDelete?: never;
    restore?: never;
}
