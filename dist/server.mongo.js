/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "844430e5537a68e6bacc";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/app.ts")(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/client/client.query.ts":
/*!****************************************!*\
  !*** ./src/api/client/client.query.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ \"./src/api/client/client.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\n\r\nvar resolvers = {\r\n    getClients: function (_, _a, __) {\r\n        var searchTerm = _a.searchTerm, page = _a.page;\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_b) {\r\n                switch (_b.label) {\r\n                    case 0: return [4 /*yield*/, _client__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getClients(searchTerm, page)];\r\n                    case 1: return [2 /*return*/, _b.sent()];\r\n                }\r\n            });\r\n        });\r\n    }\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (resolvers);\r\n\n\n//# sourceURL=webpack:///./src/api/client/client.query.ts?");

/***/ }),

/***/ "./src/api/client/client.ts":
/*!**********************************!*\
  !*** ./src/api/client/client.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar clientSchema = __webpack_require__(/*! ../../schema/Client.schema.ts */ \"./src/schema/Client.schema.ts\").default;\r\nvar mongoose = __webpack_require__(/*! ../../mongoInstance.ts */ \"./src/mongoInstance.ts\").getMongoose();\r\nvar Client = mongoose.model('Client', clientSchema);\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    getClients: function (searchTerm, page) { return __awaiter(void 0, void 0, void 0, function () {\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0: return [4 /*yield*/, Client.aggregate(getAggregations(searchTerm, page)).then(function (response, error) {\r\n                        return {\r\n                            results: response[0].results,\r\n                            count: response[0].count.length === 0 ? 0 : response[0].count[0].id\r\n                        };\r\n                    })];\r\n                case 1: return [2 /*return*/, _a.sent()];\r\n            }\r\n        });\r\n    }); },\r\n    addClient: function (client) { return __awaiter(void 0, void 0, void 0, function () {\r\n        var newClient;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    client.date_created = new Date().toISOString();\r\n                    newClient = new Client(client);\r\n                    return [4 /*yield*/, newClient.save(function (err) {\r\n                            if (err)\r\n                                throw err;\r\n                        })];\r\n                case 1:\r\n                    _a.sent();\r\n                    return [2 /*return*/, newClient];\r\n            }\r\n        });\r\n    }); },\r\n    updateClient: function (_id, input) { return __awaiter(void 0, void 0, void 0, function () {\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    if (input['date_of_birth'] === '')\r\n                        delete input['date_of_birth'];\r\n                    Object.keys(input).map(function (key) {\r\n                        if (input[key] === 'undefined')\r\n                            delete input[key];\r\n                    });\r\n                    return [4 /*yield*/, Client.findOneAndUpdate({ _id: _id }, { \"$set\": input }, { new: true }, function (err) { if (err)\r\n                            throw err; })];\r\n                case 1:\r\n                    _a.sent();\r\n                    return [2 /*return*/, true];\r\n            }\r\n        });\r\n    }); },\r\n    removeClient: function (_id) { return __awaiter(void 0, void 0, void 0, function () {\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0: return [4 /*yield*/, Client.findByIdAndRemove(_id, (function (err) {\r\n                        if (err)\r\n                            throw err;\r\n                    }))];\r\n                case 1:\r\n                    _a.sent();\r\n                    return [2 /*return*/, true];\r\n            }\r\n        });\r\n    }); }\r\n});\r\nfunction getAggregations(searchTerm, page) {\r\n    return [{\r\n            \"$facet\": {\r\n                results: [\r\n                    {\r\n                        \"$match\": {\r\n                            \"$or\": [\r\n                                { first_name: { \"$regex\": searchTerm } },\r\n                                { last_name: { \"$regex\": searchTerm } }\r\n                            ]\r\n                        }\r\n                    },\r\n                    {\r\n                        \"$sort\": { \"date_created\": -1 }\r\n                    },\r\n                    {\r\n                        \"$skip\": 5 * (page - 1)\r\n                    },\r\n                    {\r\n                        \"$limit\": 5\r\n                    }\r\n                ],\r\n                count: [\r\n                    {\r\n                        \"$match\": {\r\n                            \"$or\": [\r\n                                { first_name: { \"$regex\": searchTerm } },\r\n                                { last_name: { \"$regex\": searchTerm } }\r\n                            ]\r\n                        }\r\n                    },\r\n                    {\r\n                        \"$count\": \"id\"\r\n                    }\r\n                ]\r\n            }\r\n        }\r\n    ];\r\n}\r\n// import express,{Response, NextFunction} from 'express'\r\n// import IClient from './client.d';\r\n// var router = require('express').Router();\r\n// var mongoose = require('../../mongoInstance.ts').getMongoose();\r\n// const clientSchema = require('../../schema/Client.schema.ts').default;\r\n// const multer = require('multer');\r\n// const upload = multer()\r\n// var Client = mongoose.model('Client',clientSchema)\r\n// router.get('/', (req: express.Request,res: Response)=>{\r\n//   let searchObject:Array<any> = []\r\n//   console.log(req.query)\r\n//\r\n//   console.log('sfd')\r\n//   console.log(req.query.searchTerm!=''&&typeof req.query.searchTerm!=='undefined')\r\n//   if(req.query.searchTerm!=''&&typeof req.query.searchTerm!=='undefined')\r\n//     searchObject =\r\n//       [\r\n//         {first_name: {$regex:req.query.searchTerm,$options: \"g\"}},\r\n//         {last_name: {$regex:req.query.searchTerm,$options: \"g\"}}\r\n//       ]\r\n//       // console.log(!req.query.searchTerm||req.query.searchTerm==''?{}:{$or:searchObject})\r\n//   Client.find(!searchObject[0]?{}:{$or:searchObject},null,{skip:(5*(parseInt(req.query.page)-1)),limit:5}).sort( { date_created: -1 } ).then((results:any)=>{\r\n//     Client.count(!searchObject[0]?{}:{$or:searchObject}).then((count:number)=>{\r\n//\r\n//       console.log({count,results})\r\n//           res.send({count,results})\r\n//     })\r\n//\r\n//   })\r\n// })\r\n// router.post('/',upload.none(), (req:express.Request, res:Response)=>{\r\n//   if(!req.body.first_name){\r\n//     res.status(422).send('Missing param first_name')\r\n//     return\r\n//   }\r\n//   if(!req.body.last_name){\r\n//     res.status(422).send('Missing param last_name')\r\n//     return\r\n//   }\r\n//   if(typeof req.body.coming_from === 'undefined'){\r\n//     res.status(422).send('Missing param coming_from')\r\n//     return\r\n//   }\r\n//   if(!req.body.date_of_birth){\r\n//     res.status(422).send('Missing param date_of_birth')\r\n//     return\r\n//   }\r\n//   if(typeof req.body.civil_status === 'undefined'){\r\n//     res.status(422).send('Missing param civil_status')\r\n//     return\r\n//   }\r\n//   if(!req.body.amount_of_children){\r\n//     res.status(422).send('Missing param amount_of_children')\r\n//     return\r\n//   }\r\n//   if(!req.body.home_address){\r\n//     res.status(422).send('Missing param home_address')\r\n//     return\r\n//   }\r\n//   if(!req.body.foreign_address){\r\n//     res.status(422).send('Missing param foreign_address')\r\n//     return\r\n//   }\r\n//   if(!req.body.email){\r\n//     res.status(422).send('Missing param email')\r\n//     return\r\n//   }\r\n//   if(!req.body.telephone){\r\n//     res.status(422).send('Missing param telephone')\r\n//     return\r\n//   }\r\n//   if(!req.body.FK_User){\r\n//     res.status(422).send('Missing param FK_user')\r\n//     return\r\n//   }\r\n//\r\n//\r\n//   req.body.date_created = Date.now();\r\n//   let newClient = new Client(req.body);\r\n//   newClient.save((err:any)=>{\r\n//      if(err){\r\n//        res.status(500).send({path:err.path,message:err.message})\r\n//        return\r\n//      }else{\r\n//        res.send(newClient)\r\n//     }\r\n//   });\r\n// })\r\n// router.delete('/',(req:any,res:any)=>{\r\n//   if(!req.body._id){\r\n//     res.status(422).send('Missing param id');\r\n//     return\r\n//   }\r\n//   Client.deleteOne({_id: req.body._id},(err:any)=>{\r\n//     if(err) throw err\r\n//     res.status(200).send({_id:req.body._id})\r\n//   })\r\n// })\r\n// router.put('/',upload.none(),(req:any,res:any)=>{\r\n//   if(!req.body._id){\r\n//     res.status(422).send('Missing param _id');\r\n//     return\r\n//   }\r\n//   Client.findByIdAndUpdate(\r\n//     req.body._id,\r\n//     req.body,\r\n//     {new:true},\r\n//     (err:any, client:IClient) => {\r\n//     // Handle any possible database errors\r\n//         if (err) return res.status(500).send(err);\r\n//         return res.status(200).json(client);\r\n//     }\r\n// )\r\n// })\r\n// module.exports = router\r\n\n\n//# sourceURL=webpack:///./src/api/client/client.ts?");

/***/ }),

/***/ "./src/app.mocks.ts":
/*!**************************!*\
  !*** ./src/app.mocks.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar clients = [\r\n    { \"_id\": \"5e249aa415d6765c412cc4ba\", \"first_name\": \"Sheeree\", \"last_name\": \"Garlette\", \"coming_from\": 3, \"date_of_birth\": \"12/22/1980\", date_created: \"2011-10-05T14:48:00.000Z\", \"civil_status\": 2, \"amount_of_children\": 6, \"home_address\": \"08 Jenifer Terrace\", \"foreign_address\": \"05 Lakewood Hill\", \"email\": \"sgarlette0@google.pl\", \"telephone\": \"9763203306\", FK_User: 1 },\r\n    { \"_id\": \"5e249aa415d6765c412cc4ba\", \"first_name\": \"Marietta\", \"last_name\": \"Finlator\", \"coming_from\": 1, \"date_of_birth\": \"7/19/1973\", date_created: \"2011-10-05T14:48:00.000Z\", \"civil_status\": 3, \"amount_of_children\": 5, \"home_address\": \"10 Lukken Point\", \"foreign_address\": \"40 Kenwood Lane\", \"email\": \"mfinlator1@nytimes.com\", \"telephone\": \"3496671185\", FK_User: 1 },\r\n    { \"_id\": \"5e249aa415d6765c412cc4ba\", \"first_name\": \"Myrtice\", \"last_name\": \"Glowacz\", \"coming_from\": 3, \"date_of_birth\": \"4/26/1961\", date_created: \"2011-10-05T14:48:00.000Z\", \"civil_status\": 2, \"amount_of_children\": 4, \"home_address\": \"99957 Anhalt Road\", \"foreign_address\": \"22336 Fulton Park\", \"email\": \"mglowacz2@harvard.edu\", \"telephone\": \"2173551090\", FK_User: 1 },\r\n    { \"_id\": \"5e249aa415d6765c412cc4ba\", \"first_name\": \"Torrin\", \"last_name\": \"Getch\", \"coming_from\": 1, \"date_of_birth\": \"5/31/1955\", date_created: \"2011-10-05T14:48:00.000Z\", \"civil_status\": 2, \"amount_of_children\": 7, \"home_address\": \"63 Caliangt Lane\", \"foreign_address\": \"93 Manufacturers Way\", \"email\": \"tgetch3@virginia.edu\", \"telephone\": \"5572636912\", FK_User: 1 },\r\n    { \"_id\": \"5e249aa415d6765c412cc4ba\", \"first_name\": \"Aarika\", \"last_name\": \"Flindall\", \"coming_from\": 1, \"date_of_birth\": \"10/15/1991\", date_created: \"2011-10-05T14:48:00.000Z\", \"civil_status\": 1, \"amount_of_children\": 8, \"home_address\": \"08284 Beilfuss Place\", \"foreign_address\": \"1 Shasta Court\", \"email\": \"aflindall4@independent.co.uk\", \"telephone\": \"2895656979\", FK_User: 1 },\r\n];\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    ClientResponse: {\r\n        count: 5,\r\n        results: clients\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack:///./src/app.mocks.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mongoInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mongoInstance */ \"./src/mongoInstance.ts\");\n/* harmony import */ var _app_mocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.mocks */ \"./src/app.mocks.ts\");\n/* harmony import */ var _api_client_client_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/client/client.query */ \"./src/api/client/client.query.ts\");\nvar __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\nvar __assign = (undefined && undefined.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\n\r\nObject(_mongoInstance__WEBPACK_IMPORTED_MODULE_0__[\"initMongoose\"])();\r\n\r\nvar _a = __webpack_require__(/*! apollo-server */ \"apollo-server\"), ApolloServer = _a.ApolloServer, gql = _a.gql;\r\n\r\nvar buildFederatedSchema = __webpack_require__(/*! @apollo/federation */ \"@apollo/federation\").buildFederatedSchema;\r\nvar GraphQLScalarType = __webpack_require__(/*! graphql */ \"graphql\").GraphQLScalarType;\r\nvar typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n  type Query {\\n    getClients(searchTerm:String,page:Int): ClientResponse\\n    getCases(FK_Mongo_Client: ID,page:Int): CaseResponse\\n    est:Boolean\\n  }\\n  type Mutation{\\n\\n      addCase(input:CaseInput):Case\\n      updateClient(_id:String,input:ClientInput):Boolean\\n      removeClient(_id:String):Boolean\\n      addClient(input:ClientInput):Client\\n      updateCase(_id:String,country:String,status:Int):Boolean\\n      removeCase(_id:String):Boolean\\n\\n  }\\n  type ClientResponse{\\n      count: Int\\n      results: [Client]\\n  }\\n  type CaseResponse{\\n      count: Int\\n      results: [Case]\\n  }\\n    type Client{\\n        _id: ID,\\n        amount_of_children: Int,\\n        civil_status: Int,\\n        coming_from: Int,\\n        date_created: Date,\\n        date_of_birth: String,\\n        email: String,\\n        first_name: String,\\n        foreign_address: String,\\n        home_address: String,\\n        last_name: String,\\n        telephone: String,\\n\\n    }\\n    input ClientInput{\\n        amount_of_children: Int,\\n        civil_status: Int,\\n        coming_from: Int,\\n        date_created: Date,\\n        date_of_birth: String,\\n        email: String,\\n        first_name: String,\\n        foreign_address: String,\\n        home_address: String,\\n        last_name: String,\\n        telephone: String,\\n    }\\n    type Case {\\n        _id: ID,\\n        status: Int,\\n        country: String,\\n        date_created: Date,\\n        FK_User: Int,\\n        FK_Mongo_Client: String\\n    }\\n    input CaseInput {\\n        status: Int,\\n        country: String,\\n        date_created: Date,\\n        FK_User: Int,\\n        FK_Mongo_Client: String\\n    }\\n    scalar Date\\n\"], [\"\\n  type Query {\\n    getClients(searchTerm:String,page:Int): ClientResponse\\n    getCases(FK_Mongo_Client: ID,page:Int): CaseResponse\\n    est:Boolean\\n  }\\n  type Mutation{\\n\\n      addCase(input:CaseInput):Case\\n      updateClient(_id:String,input:ClientInput):Boolean\\n      removeClient(_id:String):Boolean\\n      addClient(input:ClientInput):Client\\n      updateCase(_id:String,country:String,status:Int):Boolean\\n      removeCase(_id:String):Boolean\\n\\n  }\\n  type ClientResponse{\\n      count: Int\\n      results: [Client]\\n  }\\n  type CaseResponse{\\n      count: Int\\n      results: [Case]\\n  }\\n    type Client{\\n        _id: ID,\\n        amount_of_children: Int,\\n        civil_status: Int,\\n        coming_from: Int,\\n        date_created: Date,\\n        date_of_birth: String,\\n        email: String,\\n        first_name: String,\\n        foreign_address: String,\\n        home_address: String,\\n        last_name: String,\\n        telephone: String,\\n\\n    }\\n    input ClientInput{\\n        amount_of_children: Int,\\n        civil_status: Int,\\n        coming_from: Int,\\n        date_created: Date,\\n        date_of_birth: String,\\n        email: String,\\n        first_name: String,\\n        foreign_address: String,\\n        home_address: String,\\n        last_name: String,\\n        telephone: String,\\n    }\\n    type Case {\\n        _id: ID,\\n        status: Int,\\n        country: String,\\n        date_created: Date,\\n        FK_User: Int,\\n        FK_Mongo_Client: String\\n    }\\n    input CaseInput {\\n        status: Int,\\n        country: String,\\n        date_created: Date,\\n        FK_User: Int,\\n        FK_Mongo_Client: String\\n    }\\n    scalar Date\\n\"])));\r\nvar resolvers = {\r\n    Query: __assign({ est: function () { return true; } }, _api_client_client_query__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\r\n    Mutation: {},\r\n    Date: new GraphQLScalarType({\r\n        name: 'Date',\r\n        description: 'Date custom scalar type',\r\n        parseValue: function (value) {\r\n            return value; // value from the client\r\n        },\r\n        serialize: function (value) {\r\n            console.log(value);\r\n            return new Date(value); // value sent to the client\r\n        },\r\n    }),\r\n};\r\nvar schemaSetup;\r\nif (false)\r\n    {}\r\nelse\r\n    schemaSetup = [{ typeDefs: typeDefs, resolvers: resolvers }];\r\nvar server = new ApolloServer({\r\n    schema: buildFederatedSchema(schemaSetup),\r\n    mockEntireSchema:  false ? undefined : false\r\n});\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (server);\r\nserver.listen(8888).then(function (_a) {\r\n    var url = _a.url;\r\n    console.log(\"\\uD83D\\uDE80 Server ready at \" + url);\r\n});\r\nvar templateObject_1;\r\n\n\n//# sourceURL=webpack:///./src/app.ts?");

/***/ }),

/***/ "./src/mongoInstance.ts":
/*!******************************!*\
  !*** ./src/mongoInstance.ts ***!
  \******************************/
/*! exports provided: initMongoose, getMongoose */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initMongoose\", function() { return initMongoose; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getMongoose\", function() { return getMongoose; });\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nfunction initMongoose() {\r\n    mongoose.connect('mongodb://linh:test123@localhost:27017/taxDB', { useNewUrlParser: true, useUnifiedTopology: true }).catch(function (err) { return console.log(err); });\r\n}\r\nfunction getMongoose() {\r\n    return mongoose;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/mongoInstance.ts?");

/***/ }),

/***/ "./src/schema/Client.schema.ts":
/*!*************************************!*\
  !*** ./src/schema/Client.schema.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar Schema = mongoose.Schema;\r\nvar clientSchema = new Schema({\r\n    first_name: String,\r\n    last_name: String,\r\n    coming_from: Number,\r\n    date_of_birth: Date,\r\n    civil_status: Number,\r\n    amount_of_children: Number,\r\n    home_address: String,\r\n    foreign_address: String,\r\n    email: String,\r\n    telephone: String,\r\n    date_created: Date,\r\n    FK_user: Number\r\n});\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (clientSchema);\r\n\n\n//# sourceURL=webpack:///./src/schema/Client.schema.ts?");

/***/ }),

/***/ "@apollo/federation":
/*!*************************************!*\
  !*** external "@apollo/federation" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@apollo/federation\");\n\n//# sourceURL=webpack:///external_%22@apollo/federation%22?");

/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server\");\n\n//# sourceURL=webpack:///external_%22apollo-server%22?");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql\");\n\n//# sourceURL=webpack:///external_%22graphql%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ })

/******/ });