/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export const ATOMIC_PERMISSIONS = {
	NONE: 0,
	READ: 1,
	UPDATE: 2,
	CREATE: 4,
	DELETE: 8,
	SHARE: 16,
}

export const BUNDLED_PERMISSIONS = {
	READ_ONLY: ATOMIC_PERMISSIONS.READ,
	UPLOAD_AND_UPDATE: ATOMIC_PERMISSIONS.READ | ATOMIC_PERMISSIONS.UPDATE | ATOMIC_PERMISSIONS.CREATE | ATOMIC_PERMISSIONS.DELETE,
	FILE_DROP: ATOMIC_PERMISSIONS.CREATE,
	ALL: ATOMIC_PERMISSIONS.UPDATE | ATOMIC_PERMISSIONS.CREATE | ATOMIC_PERMISSIONS.READ | ATOMIC_PERMISSIONS.DELETE | ATOMIC_PERMISSIONS.SHARE,
	ALL_FILE: ATOMIC_PERMISSIONS.UPDATE | ATOMIC_PERMISSIONS.READ | ATOMIC_PERMISSIONS.SHARE,
}

/**
 * Return whether a given permissions set contains some permissions.
 *
 * @param {number} initialPermissionSet - the permissions set.
 * @param {number} permissionsToCheck - the permissions to check.
 * @return {boolean}
 */
export function hasPermissions(initialPermissionSet, permissionsToCheck) {
	return initialPermissionSet !== ATOMIC_PERMISSIONS.NONE && (initialPermissionSet & permissionsToCheck) === permissionsToCheck
}

/**
 * Return whether a given permissions set is valid.
 *
 * @param {number} permissionsSet - the permissions set.
 *
 * @return {boolean}
 */
export function permissionsSetIsValid(permissionsSet) {
	// Must have at least READ or CREATE permission.
	if (!hasPermissions(permissionsSet, ATOMIC_PERMISSIONS.READ) && !hasPermissions(permissionsSet, ATOMIC_PERMISSIONS.CREATE)) {
		return false
	}

	// Must have READ permission if have UPDATE or DELETE.
	if (!hasPermissions(permissionsSet, ATOMIC_PERMISSIONS.READ) && (
		hasPermissions(permissionsSet, ATOMIC_PERMISSIONS.UPDATE) || hasPermissions(permissionsSet, ATOMIC_PERMISSIONS.DELETE)
	)) {
		return false
	}

	return true
}

/**
 * Add some permissions to an initial set of permissions.
 *
 * @param {number} initialPermissionSet - the initial permissions.
 * @param {number} permissionsToAdd - the permissions to add.
 *
 * @return {number}
 */
export function addPermissions(initialPermissionSet, permissionsToAdd) {
	return initialPermissionSet | permissionsToAdd
}

/**
 * Remove some permissions from an initial set of permissions.
 *
 * @param {number} initialPermissionSet - the initial permissions.
 * @param {number} permissionsToSubtract - the permissions to remove.
 *
 * @return {number}
 */
export function subtractPermissions(initialPermissionSet, permissionsToSubtract) {
	return initialPermissionSet & ~permissionsToSubtract
}

/**
 * Toggle some permissions from  an initial set of permissions.
 *
 * @param {number} initialPermissionSet - the permissions set.
 * @param {number} permissionsToToggle - the permissions to toggle.
 *
 * @return {number}
 */
export function togglePermissions(initialPermissionSet, permissionsToToggle) {
	if (hasPermissions(initialPermissionSet, permissionsToToggle)) {
		return subtractPermissions(initialPermissionSet, permissionsToToggle)
	} else {
		return addPermissions(initialPermissionSet, permissionsToToggle)
	}
}

/**
 * Return whether some given permissions can be toggled from a permission set.
 *
 * @param {number} permissionSet - the initial permissions set.
 * @param {number} permissionsToToggle - the permissions to toggle.
 *
 * @return {boolean}
 */
export function canTogglePermissions(permissionSet, permissionsToToggle) {
	return permissionsSetIsValid(togglePermissions(permissionSet, permissionsToToggle))
}
