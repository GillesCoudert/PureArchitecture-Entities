import type { Repository } from '@gilles-coudert/pure-architecture';
import type { Requester } from '@gilles-coudert/pure-architecture';
import type { SoftRemovableEntity } from '../../domain/soft_removable_entity';

/**
 * Repository interface for soft removable entities.
 * Soft removable entities can be created, read, updated, soft-deleted, and restored.
 *
 * This repository extends the base Repository interface, makes update, softDelete,
 * and restore mandatory, and explicitly forbids hard delete operations.
 *
 * @template TRequester - The type of the requester (user/system making the request)
 * @template TEntity - The soft removable entity type (must extend SoftRemovableEntity)
 * @template TAccessPolicy - The type of access control policy applied to this entity
 * @template TId - The type of the entity identifier (defaults to string)
 *
 * @extends {Repository<TRequester, TEntity, TId>}
 */
export interface SoftRemovableEntityRepository<
    TRequester extends Requester,
    TEntity extends SoftRemovableEntity<TAccessPolicy, TId>,
    TAccessPolicy = undefined,
    TId = string,
> extends Omit<
    Repository<TRequester, TEntity, TId>,
    'update' | 'softDelete' | 'restore'
> {
    /**
     * Updates an existing entity 
     */
    update: Required<Repository<TRequester, TEntity, TId>>['update'];

    /**
     * Soft deletes an entity by marking it as removed 
     */
    softDelete: Required<Repository<TRequester, TEntity, TId>>['softDelete'];

    /**
     * Restores a soft deleted entity 
     */
    restore: Required<Repository<TRequester, TEntity, TId>>['restore'];
}
