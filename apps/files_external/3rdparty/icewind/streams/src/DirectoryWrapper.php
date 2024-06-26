<?php
/**
 * SPDX-FileCopyrightText: 2015 Robin Appelman <robin@icewind.nl>
 * SPDX-License-Identifier: MIT
 */

namespace Icewind\Streams;

class DirectoryWrapper extends Wrapper implements Directory {
	public function stream_open($path, $mode, $options, &$opened_path) {
		return false;
	}

	/**
	 * @param string $path
	 * @param array $options
	 * @return bool
	 */
	public function dir_opendir($path, $options) {
		$this->loadContext();
		return true;
	}

	/**
	 * @return string|false
	 */
	public function dir_readdir() {
		return readdir($this->source);
	}

	/**
	 * @return bool
	 */
	public function dir_closedir() {
		closedir($this->source);
		return true;
	}

	/**
	 * @return bool
	 */
	public function dir_rewinddir() {
		rewinddir($this->source);
		return true;
	}
}
