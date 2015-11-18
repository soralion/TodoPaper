/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Archive, ItemContainer, ItemPane, MenuBar, ModalItemEditor, ModalWindow, Project, ProjectComponent, ProjectComponentSorting, ProjectPaneComponent, React, SignalComponent, TagComponent, TaskComponent, TaskComponentSorting, assign, authenticateProcessing, client, createRdom, deepcopy, filepath, h, helper, icons, moment, myRegEx, p, plurals, rdomid, update, vdom, writeDBoxFile,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(16);

	update = React.addons.update;

	h = __webpack_require__(3).h;

	p = __webpack_require__(3).p;

	Archive = __webpack_require__(3).Archive;

	Project = __webpack_require__(3).Project;

	assign = __webpack_require__(5);

	moment = __webpack_require__(2);

	icons = __webpack_require__(4).icons;

	MenuBar = __webpack_require__(6).MenuBar;

	ModalItemEditor = __webpack_require__(7).ModalItemEditor;

	ModalWindow = __webpack_require__(7).ModalWindow;

	ItemPane = __webpack_require__(8).ItemPane;

	__webpack_require__(10);

	deepcopy = __webpack_require__(12);

	client = new Dropbox.Client({
	  key: "lg3odv40t9d1lbw"
	});

	authenticateProcessing = function() {
	  var button;
	  client.authenticate({
	    interactive: false
	  }, function(error, client) {
	    if (error) {
	      return handleError(error);
	    }
	  }, client.isAuthenticated() ? alert("authenticated!") : (button = document.querySelector("#signin-button"), button.setAttribute("class", "visible"), button.addEventListener("click", function() {
	    return client.authenticate(function(error, client) {
	      if (error) {
	        return handleError(error);
	      } else {
	
	      }
	    });
	  })));
	};

	writeDBoxFile = function(filename, filecontent) {
	  return client.writeFile(filename, filecontent, function(error, stat) {
	    if (error) {
	      return console.log(error);
	    }
	    return alert("File saved as revision " + stat.versionTag);
	  });
	};

	rdomid = function(idname) {
	  return document.getElementById(idname);
	};

	createRdom = function(target, elementName) {
	  return target.createElement(elementName);
	};

	myRegEx = {
	  repeatPhrase: /(now|n|d|due|)\+?(\d+)(days|day|d|weeks|week|wks|wk|w|months|month|mons|mon|m|)/,
	  configLine: /\n\s*\$config\:\s*(.*)/,
	  emptyLine: /^$\n/gm,
	  emptyFinalLine: /^\n/gm
	};

	plurals = {
	  day: ["days", "day", "d"],
	  week: ["weeks", "week", "wks", "wk", "w"],
	  month: ["months", "month", "mons", "mon", "m"]
	};

	vdom = React.createElement;

	React.initializeTouchEvents(true);

	helper = {};

	helper.isElementMatchTagAndClass = function(ele, _tagArr, _classArr) {
	  var _className, _tagName, j, l, len, len1;
	  if ((ele.className != null) && (typeof ele.className === "string") && (ele.tagName != null)) {
	    for (j = 0, len = _tagArr.length; j < len; j++) {
	      _tagName = _tagArr[j];
	      for (l = 0, len1 = _classArr.length; l < len1; l++) {
	        _className = _classArr[l];
	        if ((ele.className.indexOf(_className) !== -1) && ele.tagName === _tagName) {
	          return true;
	        }
	      }
	    }
	  }
	  return false;
	};

	helper.returnNthParent = function(ele, n) {
	  if (n === 0) {
	    return ele;
	  }
	  return helper.returnNthParent(ele.parentNode, n - 1);
	};

	helper.returnItemInParent = function(el) {
	  var _t, j, len, n, ref;
	  ref = [0, 1, 2, 3, 4, 5];
	  for (j = 0, len = ref.length; j < len; j++) {
	    n = ref[j];
	    _t = null;
	    _t = helper.returnNthParent(el, n);
	    if (helper.isElementMatchTagAndClass(_t, ["LI", "li"], ["task", "project"])) {
	      return _t;
	    }
	  }
	  return null;
	};

	helper.deleteEmptyLines = function(str1) {
	  var ret;
	  ret = "";
	  ret = str1.replace(myRegEx.emptyLine, "");
	  ret = ret.replace(myRegEx.emptyFinalLine, "");
	  return ret;
	};

	helper.exportTPPwithConfig = function(_IL, _config) {
	  var _fl, _t, _ts, focus, i, j, len, pos;
	  _t = "";
	  _t = helper.deleteEmptyLines(h.serialize(_IL));
	  console.log("data saved in local storage");
	  _fl = deepcopy(_config.focusLists);
	  for (i = j = 0, len = _fl.length; j < len; i = ++j) {
	    focus = _fl[i];
	    if (focus.projectId != null) {
	      pos = h.itemPosInArray(focus.projectId, _IL);
	      focus.projectId = pos;
	    }
	  }
	  _ts = moment().unix();
	  _t += "\n$config: " + JSON.stringify({
	    focusLists: _fl,
	    timestamp: _ts
	  });
	  return _t;
	};

	helper.defaultFocusLists = [
	  {
	    name: "default",
	    projectId: null,
	    filter: null,
	    sort: null,
	    order: null,
	    isActive: true,
	    condition: null
	  }, {
	    projectId: null,
	    name: "Due",
	    sort: null,
	    condition: {
	      dueRange: [null, 1],
	      woTag: ["project"],
	      wTag: []
	    },
	    order: [],
	    isActive: false
	  }, {
	    projectId: null,
	    name: "High!!@OFFICE",
	    sort: null,
	    condition: {
	      dueRange: [null, null],
	      woTag: ["project", "home", "after", "errand"],
	      wTag: ["high"]
	    },
	    order: [],
	    isActive: false
	  }, {
	    projectId: null,
	    name: "Home",
	    sort: null,
	    condition: {
	      dueRange: [null, null],
	      woTag: ["project", "office"],
	      wTag: ["high"]
	    },
	    order: [],
	    isActive: false
	  }
	];

	helper.getTPPAndConfigContentArray = function(_tppStr) {
	  var a, cc, fl, focus, it, j, l, len, len1, m, mObject, ref, replaced, str0, ts, tt;
	  if (_tppStr != null) {
	    str0 = "";
	    str0 = _tppStr;
	    m = myRegEx.configLine.exec(str0);
	    replaced = str0.replace(myRegEx.configLine, "");
	    replaced = helper.deleteEmptyLines(replaced);
	    tt = h.dueConvert(p.parseTPStringToTPObject(replaced));
	    if (m != null) {
	      try {
	        mObject = JSON.parse(m[1]);
	        fl = mObject.focusLists;
	        for (j = 0, len = fl.length; j < len; j++) {
	          focus = fl[j];
	          a = focus.projectId;
	          if (a != null) {
	            focus.projectId = tt[a].id;
	          }
	          if (a != null) {
	            tt[a].isFolding = false;
	            ref = h.childzAncestorArray(tt[a], tt);
	            for (l = 0, len1 = ref.length; l < len1; l++) {
	              it = ref[l];
	              it.isFolding = false;
	            }
	          }
	        }
	        ts = mObject.timestamp;
	      } catch (_error) {
	        fl = helper.defaultFocusLists;
	        ts = 0;
	      }
	    }
	  }
	  if (tt == null) {
	    tt = [];
	  }
	  if (fl == null) {
	    fl = helper.defaultFocusLists;
	  }
	  if (ts == null) {
	    ts = 0;
	  }
	  cc = {
	    isTouchSupport: 'ontouchstart' in window,
	    isLargeScreen: window.innerWidth >= 550,
	    innerWidth: window.innerWidth,
	    innerHeight: window.innerHeight,
	    elementWidth: 400,
	    isEditing: false,
	    isSorting: false,
	    isNewItemEditing: false,
	    isJumping: false,
	    focusLists: fl,
	    timestamp: ts,
	    showInactive: false
	  };
	  return [replaced, tt, cc];
	};

	SignalComponent = __webpack_require__(9).SignalComponent;

	TagComponent = __webpack_require__(9).TagComponent;

	TaskComponent = __webpack_require__(9).TaskComponent;

	TaskComponentSorting = __webpack_require__(9).TaskComponentSorting;

	ProjectComponent = __webpack_require__(9).ProjectComponent;

	ProjectComponentSorting = __webpack_require__(9).ProjectComponentSorting;

	ProjectPaneComponent = __webpack_require__(9).ProjectPaneComponent;

	filepath = "todos/hello_world2.taskpaper";

	React.initializeTouchEvents(true);

	ItemContainer = React.createClass({
	  displayName: "ItemContainer",
	  getDefaultProps: function() {},
	  getInitialState: function() {
	    var cc, ref, str0, tt;
	    console.log(window.innerWidth >= 550);
	    ref = helper.getTPPAndConfigContentArray(window.localStorage.getItem("taskpaperFile")), str0 = ref[0], tt = ref[1], cc = ref[2];
	    return {
	      ItemList: tt,
	      DataText: str0,
	      Text: "default text @home @today",
	      TempText: "",
	      config: cc
	    };
	  },
	  handleResize: function(e) {
	    var out1, out2, out3;
	    out1 = update(this.state.config, {
	      isLargeScreen: {
	        $set: window.innerWidth >= 550
	      }
	    });
	    out2 = update(out1, {
	      innerWidth: {
	        $set: window.innerWidth
	      }
	    });
	    out3 = update(out2, {
	      innerHeight: {
	        $set: window.innerHeight
	      }
	    });
	    this.setState({
	      config: out3
	    });
	  },
	  componentWillUnmount: function() {
	    return window.removeEventListener('resize', this.handleResize);
	  },
	  componentDidUpdate: function() {
	    var _t;
	    if (window.localStorage != null) {
	      _t = helper.exportTPPwithConfig(this.state.ItemList, this.state.config);
	      window.localStorage.setItem("taskpaperFile", _t);
	    }
	  },
	  componentDidMount: function() {
	    this.init = 0;
	    console.log('ontouchstart' in window);
	    if (React.findDOMNode(this.refs.myInput) != null) {
	      React.findDOMNode(this.refs.myInput).addEventListener('keydown', (function(e) {
	        var elem, end, start, value;
	        if (e.keyCode === 9) {
	          if (e.preventDefault) {
	            e.preventDefault();
	          }
	          elem = e.target;
	          start = elem.selectionStart;
	          end = elem.selectionEnd;
	          value = elem.value;
	          elem.value = (value.substring(0, start)) + "\t" + (value.substring(end));
	          return elem.selectionStart = elem.selectionEnd = start + 1;
	        }
	      }));
	    }
	    this.setState({
	      elementWidth: React.findDOMNode(this.refs.root).clientWidth
	    });
	    window.addEventListener('resize', this.handleResize);
	    authenticateProcessing();
	    if (location.hostname === "") {
	      return;
	    }
	    client.readFile(filepath, (function(_this) {
	      return function(e, str1, stat) {
	        var cc, ref, str0, tt;
	        if (e == null) {
	          ref = helper.getTPPAndConfigContentArray(str1), str0 = ref[0], tt = ref[1], cc = ref[2];
	          if (cc.timestamp > _this.state.config.timestamp) {
	            return _this.setState({
	              ItemList: tt
	            }, function() {
	              return this.setState({
	                config: cc
	              });
	            });
	          }
	        } else {
	          return console.log("error during loading first data");
	        }
	      };
	    })(this));
	  },
	  saveData: function(e) {
	    var _t;
	    _t = helper.exportTPPwithConfig(this.state.ItemList, this.state.config);
	    if (_t.length > 50) {
	      try {
	        writeDBoxFile(filepath, _t);
	      } catch (_error) {
	        console.log("error during dropbox save");
	      }
	      if (window.localStorage != null) {
	        window.localStorage.setItem("taskpaperFile", _t);
	      }
	    } else {
	      alert("It seems that your data hasn't been loaded or changed in bad way.");
	    }
	  },
	  loadData: function() {
	    if (window.confirm("This will overwrite the data. Are you sure?")) {
	      client.readFile(filepath, (function(_this) {
	        return function(e, str1, stat) {
	          var cc, ref, str0, tt;
	          console.log(e);
	          if (e == null) {
	            ref = helper.getTPPAndConfigContentArray(str1), str0 = ref[0], tt = ref[1], cc = ref[2];
	            return _this.setState({
	              ItemList: tt
	            }, function() {
	              return this.setState({
	                config: cc
	              });
	            });
	          } else {
	            return console.log("error during loading");
	          }
	        };
	      })(this));
	    }
	  },
	  strModFinished: function(e) {
	    console.log("finished");
	    this.setState({
	      ItemList: h.dueConvert(p.parseTPStringToUpdateTPObj(this.state.ItemList, React.findDOMNode(this.refs.myInput).value))
	    });
	  },
	  newItemAddedHandler: function(val) {
	    var _id, focusNow, out1, pos1, t;
	    if (val !== "") {
	      t = p.convertLineToItem(val);
	      focusNow = this.returnActiveFocus();
	      if (focusNow.projectId != null) {
	        _id = focusNow.projectId;
	        t.parentId = focusNow.projectId;
	        out1 = this.state.ItemList;
	      } else {
	        _id = h.returnInboxId(this.state.ItemList);
	        if (_id != null) {
	          t.parentId = _id;
	          out1 = this.state.ItemList;
	        } else {
	          out1 = update(this.state.ItemList, {
	            $splice: [[0, 0, new Project("Inbox")]]
	          });
	          _id = h.returnInboxId(out1);
	          t.parentId = _id;
	        }
	      }
	      console.log(_id);
	      pos1 = h.itemPosInArray(_id, this.state.ItemList);
	      return this.setState({
	        ItemList: update(out1, {
	          $splice: [[pos1 + 1, 0, t]]
	        })
	      }, function() {
	        val = "";
	        this.state.config.isNewItemEditing = false;
	        return this.setState({
	          config: this.state.config
	        });
	      });
	    } else {
	      this.state.config.isNewItemEditing = false;
	      return this.setState({
	        config: this.state.config
	      });
	    }
	  },
	  newItemAddedToInboxHandler: function(val) {
	    var _id, out1, pos1, t;
	    if (val !== "") {
	      t = p.convertLineToItem(val);
	      _id = h.returnInboxId(this.state.ItemList);
	      if (_id != null) {
	        t.parentId = _id;
	        out1 = this.state.ItemList;
	      } else {
	        out1 = update(this.state.ItemList, {
	          $splice: [[0, 0, new Project("Inbox")]]
	        });
	        _id = h.returnInboxId(out1);
	        t.parentId = _id;
	      }
	      console.log(_id);
	      pos1 = h.itemPosInArray(_id, this.state.ItemList);
	      return this.setState({
	        ItemList: update(out1, {
	          $splice: [[pos1 + 1, 0, t]]
	        })
	      }, function() {
	        val = "";
	        this.state.config.isNewItemEditing = false;
	        return this.setState({
	          config: this.state.config
	        });
	      });
	    } else {
	      this.state.config.isNewItemEditing = false;
	      return this.setState({
	        config: this.state.config
	      });
	    }
	  },
	  archive: function(e) {
	    var ar, archiveItemId, i, item, j, k, len, out1, out2, path, spliceArr, tgt, v;
	    ar = {
	      pos: 0
	    };
	    if (!(indexOf.call((function() {
	      var j, len, ref, results;
	      ref = this.state.ItemList;
	      results = [];
	      for (j = 0, len = ref.length; j < len; j++) {
	        item = ref[j];
	        results.push(item.name);
	      }
	      return results;
	    }).call(this), "Archive") >= 0)) {
	      out1 = update(this.state.ItemList, {
	        $push: [new Archive()]
	      });
	    } else {
	      out1 = this.state.ItemList;
	    }
	    archiveItemId = out1.filter((function(ele, i) {
	      if (ele.name === "Archive") {
	        return this.pos = i;
	      }
	    }), ar)[0].id;
	    console.log("archive id is " + archiveItemId + " and " + ar.pos);
	    spliceArr = [];
	    for (i = j = 0, len = out1.length; j < len; i = ++j) {
	      item = out1[i];
	      if (indexOf.call((function() {
	        var ref, results;
	        ref = item.tags;
	        results = [];
	        for (k in ref) {
	          if (!hasProp.call(ref, k)) continue;
	          v = ref[k];
	          results.push(k);
	        }
	        return results;
	      })(), "done") >= 0) {
	        if (i < ar.pos) {
	          path = h.childzPath(out1, item.id);
	          console.log(i + "th item " + item.name);
	          tgt = update(item, {
	            tags: {
	              $merge: {
	                project: path
	              }
	            },
	            parentId: {
	              $set: archiveItemId
	            }
	          });
	          spliceArr.push([i, 1, tgt]);
	        }
	      }
	    }
	    out2 = update(out1, {
	      $splice: spliceArr
	    });
	    this.setState({
	      ItemList: h.sortItemList(out2)
	    });
	  },
	  handleCheck: function(val, id) {
	    console.log("true");
	    if (val) {
	      return this.setState({
	        ItemList: h.sortItemList(h.decendentDone(id, h.itemDone(id, this.state.ItemList)))
	      });
	    } else {
	      return this.setState({
	        ItemList: h.sortItemList(h.decendentUndone(id, h.itemUndone(id, this.state.ItemList)))
	      });
	    }
	  },
	  handleTagDeleted: function(tagkey, id) {
	    var _pos;
	    console.log(id);
	    _pos = h.itemPosInArray(id, this.state.ItemList);
	    delete this.state.ItemList[_pos].tags[tagkey];
	    return this.setState({
	      ItemList: this.state.ItemList
	    });
	  },
	  handleStarClick: function(id, nextVal) {
	    var item;
	    item = h.itemWithId(id, this.state.ItemList);
	    if (nextVal) {
	      item.tags["high"] = "";
	    } else {
	      delete item.tags["high"];
	    }
	    return this.setState({
	      ItemList: this.state.ItemList
	    });
	  },
	  handleSelectionChanged: function(val, id) {
	    var item, j, len, ref;
	    if (!val) {
	      ref = this.state.ItemList;
	      for (j = 0, len = ref.length; j < len; j++) {
	        item = ref[j];
	        if (item.isSelected) {
	          item.isSelected = false;
	        }
	      }
	      h.itemWithId(id, this.state.ItemList).isSelected = !val;
	    } else {
	      h.itemWithId(id, this.state.ItemList).isSelected = !val;
	    }
	    return this.setState({
	      ItemList: this.state.ItemList
	    });
	  },
	  handleFolderToggled: function(val, id) {
	    h.itemWithId(id, this.state.ItemList).isFolding = !val;
	    return this.setState({
	      ItemList: this.state.ItemList
	    });
	  },
	  dragStart: function(e) {
	    var ref, ref1;
	    this.dragged = e.currentTarget;
	    if (((ref = e.dataTransfer) != null ? ref.effectAllowed : void 0) != null) {
	      e.dataTransfer.effectAllowed = 'move';
	    }
	    if (((ref1 = e.dataTransfer) != null ? ref1.setData : void 0) != null) {
	      e.dataTransfer.setData('text/html', e.currentTarget);
	    }
	  },
	  swipeFinishedHandler: function(draggedId, droppedId) {
	    var _dataItemList, draggedItem, draggedPos, droppedItem, droppedPos, key, tgt, v;
	    _dataItemList = this.state.ItemList;
	    console.log("item " + draggedId + " is dropped at " + droppedId);
	    draggedItem = h.itemWithId(draggedId, _dataItemList);
	    droppedItem = h.itemWithId(droppedId, _dataItemList);
	    if (indexOf.call((function() {
	      var results;
	      results = [];
	      for (key in droppedItem) {
	        v = droppedItem[key];
	        results.push(key);
	      }
	      return results;
	    })(), "isDir") >= 0 && (draggedId !== droppedId)) {
	      draggedPos = h.itemPosInArray(draggedId, _dataItemList);
	      droppedPos = h.itemPosInArray(droppedId, _dataItemList);
	      if (droppedItem.isDir) {
	        if ((indexOf.call(h.childzAncestorArray(droppedItem, _dataItemList), draggedItem) >= 0)) {
	          return;
	        }
	        tgt = update(draggedItem, {
	          parentId: {
	            $set: droppedId
	          }
	        });
	        this.state.ItemList = update(this.state.ItemList, {
	          $splice: [[draggedPos, 1, tgt]]
	        });
	        if (draggedItem.isDir) {
	          console.log("same dir");
	        }
	      } else {
	        if ((indexOf.call(h.childzAncestorArray(droppedItem, _dataItemList), draggedItem) >= 0)) {
	          return;
	        }
	        if (droppedItem.parentId !== draggedItem.parentId) {
	          tgt = update(draggedItem, {
	            parentId: {
	              $set: droppedItem.parentId
	            }
	          });
	        } else {
	          tgt = draggedItem;
	        }
	        if (draggedPos > droppedPos) {
	          this.state.ItemList = update(this.state.ItemList, {
	            $splice: [[draggedPos, 1], [droppedPos + 1, 0, tgt]]
	          });
	        } else {
	          this.state.ItemList = update(this.state.ItemList, {
	            $splice: [[draggedPos, 1], [droppedPos, 0, tgt]]
	          });
	        }
	      }
	    }
	    this.setState({
	      ItemList: h.sortItemList(this.state.ItemList)
	    });
	  },
	  dragEnd: function(e) {
	    var _dataItemList, draggedId, draggedItem, draggedPos, droppedId, droppedItem, droppedPos, key, ref, ref1, ref2, tgt, v;
	    if (this.returnActiveFocus().name !== "default") {
	      return;
	    }
	    _dataItemList = this.state.ItemList;
	    this.dragged.style.display = 'block';
	    draggedId = this.dragged.dataset.id;
	    droppedId = (ref = (ref1 = (ref2 = this.over.dataset.id) != null ? ref2 : this.over.parentNode.dataset.id) != null ? ref1 : this.over.parentNode.parentNode.dataset.id) != null ? ref : this.over.parentNode.parentNode.parentNode.dataset.id;
	    console.log("item " + draggedId + " is dropped at " + droppedId);
	    draggedItem = h.itemWithId(draggedId, _dataItemList);
	    droppedItem = h.itemWithId(droppedId, _dataItemList);
	    if (indexOf.call((function() {
	      var results;
	      results = [];
	      for (key in droppedItem) {
	        v = droppedItem[key];
	        results.push(key);
	      }
	      return results;
	    })(), "isDir") >= 0 && (draggedId !== droppedId)) {
	      draggedPos = h.itemPosInArray(draggedId, _dataItemList);
	      droppedPos = h.itemPosInArray(droppedId, _dataItemList);
	      if (droppedItem.isDir) {
	        if ((indexOf.call(h.childzAncestorArray(droppedItem, _dataItemList), draggedItem) >= 0)) {
	          return;
	        }
	        tgt = update(draggedItem, {
	          parentId: {
	            $set: droppedId
	          }
	        });
	        this.state.ItemList = update(this.state.ItemList, {
	          $splice: [[draggedPos, 1, tgt]]
	        });
	        if (draggedItem.isDir) {
	          console.log("same dir");
	        }
	      } else {
	        if ((indexOf.call(h.childzAncestorArray(droppedItem, _dataItemList), draggedItem) >= 0)) {
	          return;
	        }
	        if (droppedItem.parentId !== draggedItem.parentId) {
	          tgt = update(draggedItem, {
	            parentId: {
	              $set: droppedItem.parentId
	            }
	          });
	        } else {
	          tgt = draggedItem;
	        }
	        if (draggedPos > droppedPos) {
	          this.state.ItemList = update(this.state.ItemList, {
	            $splice: [[draggedPos, 1], [droppedPos + 1, 0, tgt]]
	          });
	        } else {
	          this.state.ItemList = update(this.state.ItemList, {
	            $splice: [[draggedPos, 1], [droppedPos, 0, tgt]]
	          });
	        }
	      }
	    }
	    this.setState({
	      ItemList: h.sortItemList(this.state.ItemList)
	    });
	  },
	  dragOver: function(e) {
	    e.preventDefault();
	    if (e.target.className === 'placeholder') {
	      return;
	    }
	    this.over = e.target;
	  },
	  onChangeHandler: function(e) {
	    console.log(e.target.value);
	    this.setState({
	      Text: e.target.value
	    });
	  },
	  _onNewItemWindowInputChange: function(e) {
	    this.setState({
	      Text: e.target.value
	    });
	    return null;
	  },
	  _onNewItemWindowInputFocus: function(e) {
	    var elem;
	    elem = e.target;
	    elem.selectionStart = elem.selectionEnd = 2;
	    return null;
	  },
	  returnActiveFocus: function() {
	    return this.state.config.focusLists.filter(function(ele) {
	      return ele.isActive;
	    })[0];
	  },
	  onEyeIconClicked: function() {
	    this.state.config.showInactive = !this.state.config.showInactive;
	    this.setState({
	      config: this.state.config
	    });
	    return null;
	  },
	  render: function() {
	    var _fn, focus, focusName, h1, iTarget, item, itemsToShow, mainPaneStyle, mainStyle, w1;
	    focus = this.returnActiveFocus();
	    if (focus.name === "default") {
	      try {
	        focusName = h.itemWithId(focus.projectId, this.state.ItemList).name + ": ";
	      } catch (_error) {
	        focusName = "Root: ";
	      }
	    } else {
	      focusName = focus.name + ": ";
	    }
	    w1 = {
	      style: {
	        width: "4px"
	      }
	    };
	    h1 = this.state.config.innerHeight - 50;
	    mainPaneStyle = {
	      height: "" + (h1 * 0.9),
	      overflowY: "scroll"
	    };
	    mainStyle = this.state.config.isLargeScreen ? {
	      marginTop: "" + (h1 * 0.03)
	    } : {
	      marginTop: "" + (h1 * 0.03)
	    };
	    if (focus.name === "default") {
	      itemsToShow = h.returnDecendantItems(this.state.ItemList, focus.projectId);
	    } else {
	      _fn = (function(_this) {
	        return function(ele) {
	          var a, b, c, fc, j, l, len, len1, ref, ref1, t;
	          if (focus.condition == null) {
	            return false;
	          }
	          fc = focus.condition;
	          if ((fc.dueRange[0] != null) || (fc.dueRange[1] != null)) {
	            a = h.isDueInRange(ele, fc.dueRange[0], fc.dueRange[1]);
	          } else {
	            a = true;
	          }
	          b = true;
	          if (fc.wTag.length > 0) {
	            ref = fc.wTag;
	            for (j = 0, len = ref.length; j < len; j++) {
	              t = ref[j];
	              b = b && h.isWithTag(ele, t) || h.isAncestorWithTag(ele, t, _this.state.ItemList);
	            }
	          }
	          c = true;
	          if (fc.woTag.length > 0) {
	            ref1 = fc.woTag;
	            for (l = 0, len1 = ref1.length; l < len1; l++) {
	              t = ref1[l];
	              c = c && !h.isWithTag(ele, t) && !h.isAncestorWithTag(ele, t, _this.state.ItemList);
	            }
	          }
	          return a && b && c;
	        };
	      })(this);
	      itemsToShow = this.state.ItemList.filter(_fn);
	    }
	    try {
	      iTarget = (focus.projectId != null ? (h.itemWithId(focus.projectId, this.state.ItemList)).name : void 0);
	    } catch (_error) {
	      iTarget = "Inbox";
	    }
	    return vdom('div', {
	      ref: "root"
	    }, vdom("div", {
	      className: "row floating-menu"
	    }, vdom(MenuBar, {
	      mapShow: !this.state.config.isLargeScreen,
	      cnfg: this.state.config,
	      onOpenMapToJump: this.openMapToJump,
	      onNewItemAdded: this.newItemAddedHandler,
	      onNewItemAddedToInbox: this.newItemAddedToInboxHandler,
	      onSaveData: this.saveData,
	      onLoadData: this.loadData,
	      onEyeIconClicked: this.onEyeIconClicked,
	      onStartEditing: this.startEditing,
	      onStartEditingAll: this.startEditingAll,
	      onStartSorting: this.startSorting,
	      onArchived: this.archive,
	      onDeleted: this.deleteItem,
	      inputTarget: iTarget
	    })), vdom("div", {
	      className: "row main",
	      style: mainStyle
	    }, this.state.config.isLargeScreen ? vdom("div", {
	      className: "side-pane four columns no-scrollbar",
	      style: mainPaneStyle
	    }, vdom(ItemPane, {
	      ItemList: this.state.ItemList,
	      config: this.state.config,
	      dropHandler: ((function(_this) {
	        return function(e, over) {
	          _this.over = over;
	          _this.dragEnd(e);
	        };
	      })(this)),
	      onFolderOpenFromPane: this.openFoldersAndFocus,
	      onSmartFolderClicked: this.openSmartFolderAndFocus
	    })) : void 0, vdom("div", {
	      className: (this.state.config.isLargeScreen ? "main-pane eight columns no-scrollbar" : "main-pane u-full-width"),
	      style: (this.state.config.isLargeScreen ? mainPaneStyle : {
	        overflowY: "scroll"
	      })
	    }, vdom("ul", {
	      className: "u-full-width"
	    }, vdom("div", {
	      style: {
	        fontWeight: "600",
	        fontSize: "large"
	      }
	    }, focusName), (function() {
	      var j, len, results;
	      results = [];
	      for (j = 0, len = itemsToShow.length; j < len; j++) {
	        item = itemsToShow[j];
	        if (item.isDir) {
	          results.push(vdom(ProjectComponent, {
	            className: "eight columns",
	            data: item,
	            key: item.id,
	            onDblClick: this.dblClickHandler,
	            dropHandler: this.dragEnd,
	            dragOverHandler: this.dragOver,
	            dragStartHandler: this.dragStart,
	            changeChecked: this.handleCheck,
	            tagDeleted: this.handleTagDeleted,
	            selectionChanged: this.handleSelectionChanged,
	            folderToggled: this.handleFolderToggled,
	            onSwipeFinished: this.swipeFinishedHandler,
	            additionalTag: focus.name === "default" ? {} : {
	              prj: h.childzPath(this.state.ItemList, item.id)
	            },
	            childzStyle: {
	              marginLeft: (h.itemDepth(item, this.state.ItemList) * 1 - 1) + "rem",
	              display: h.isAncestorFolding(item.id, this.state.ItemList) ? "none" : "block"
	            }
	          }, item.isFolding && item.name !== "Archive" ? vdom(SignalComponent, {
	            arr: h.returnDecendantItems(this.state.ItemList, item.id),
	            IL: this.state.ItemList
	          }) : void 0));
	        } else {
	          if ((h.isWithTag(item, ["waiting", "someday"]) || h.isAncestorWithTag(item, ["waiting", "someday"], this.state.ItemList)) && !this.state.config.showInactive) {
	            results.push(vdom("div", {
	              key: item.id,
	              className: "task inactive",
	              style: {
	                marginLeft: (h.itemDepth(item, this.state.ItemList) * 1 - 1) + "rem",
	                paddingLeft: "7.5rem",
	                display: h.isAncestorFolding(item.id, this.state.ItemList) ? "none" : "block"
	              },
	              onClick: (function(_this) {
	                return function() {
	                  _this.state.config.showInactive = true;
	                  return _this.setState({
	                    config: _this.state.config
	                  });
	                };
	              })(this)
	            }, "" + item.name));
	          } else {
	            results.push(vdom(TaskComponent, {
	              className: "eight columns",
	              data: item,
	              key: item.id,
	              onDblClick: this.dblClickHandler,
	              draggable: true,
	              dropHandler: this.dragEnd,
	              dragOverHandler: this.dragOver,
	              dragStartHandler: this.dragStart,
	              changeChecked: this.handleCheck,
	              onStarClick: this.handleStarClick,
	              selectionChanged: this.handleSelectionChanged,
	              tagDeleted: this.handleTagDeleted,
	              onSwipeFinished: this.swipeFinishedHandler,
	              folderTag: focus.name === "default" ? {} : {
	                prj: h.childzPath(this.state.ItemList, item.id)
	              },
	              ancestorTagsObj: h.ancestorTags(item, this.state.ItemList),
	              childzStyle: {
	                marginLeft: (h.itemDepth(item, this.state.ItemList) * 1 - 1) + "rem",
	                display: h.isAncestorFolding(item.id, this.state.ItemList) ? "none" : "block"
	              }
	            }));
	          }
	        }
	      }
	      return results;
	    }).call(this)), this.state.config.isLargeScreen ? vdom("div", {
	      className: "row"
	    }, vdom("textarea", {
	      ref: "myInput",
	      onMouseOver: ((function(_this) {
	        return function(e) {
	          e.target.value = h.serialize(_this.state.ItemList);
	        };
	      })(this)),
	      onBlur: this.strModFinished,
	      onMouseLeave: this.strModFinished,
	      className: "u-full-width no-scrollbar",
	      style: {
	        marginTop: "100px"
	      },
	      defaultValue: "222"
	    })) : void 0)), this.state.config.isEditing && this.state.ItemList.filter(function(ele) {
	      return ele.isSelected;
	    }).length === 1 ? vdom(ModalItemEditor, {
	      shown: this.state.config.isEditing,
	      data: this.state.ItemList.filter(function(ele) {
	        return ele.isSelected;
	      })[0],
	      onCancel: this.handleModalCancel,
	      onSave: this.handleModalSave
	    }) : void 0, this.state.config.isJumping ? vdom(ModalWindow, {
	      shown: this.state.config.isJumping,
	      okShown: false,
	      onRequestClose: this.closeMap
	    }, vdom("div", {
	      style: {
	        overflowY: "scroll",
	        height: "" + (this.state.config.innerHeight * 0.7),
	        marginBottom: "15px",
	        marginTop: "15px"
	      }
	    }, vdom(ItemPane, {
	      ItemList: this.state.ItemList,
	      config: this.state.config,
	      onFolderOpenFromPane: this.openFoldersAndFocusAndCloseMap,
	      onSmartFolderClicked: this.openSmartFolderAndFocusAndCloseMap
	    }))) : void 0);
	  },
	  closeMap: function() {
	    console.log("closing map");
	    return this.setState({
	      config: update(this.state.config, {
	        isJumping: {
	          $set: false
	        }
	      })
	    });
	  },
	  openFolders: function(id) {
	    var item, j, len, ref, targetItem;
	    targetItem = h.itemWithId(id, this.state.ItemList);
	    ref = h.childzAncestorArray(targetItem, this.state.ItemList);
	    for (j = 0, len = ref.length; j < len; j++) {
	      item = ref[j];
	      item.isFolding = false;
	    }
	    targetItem.isFolding = false;
	    this.setState({
	      ItemList: this.state.ItemList
	    });
	    return rdomid(id).scrollIntoView();
	  },
	  openFoldersAndFocus: function(id) {
	    var fn, out1, out2;
	    out1 = update(this.state.config.focusLists, {
	      0: {
	        projectId: {
	          $set: id
	        }
	      }
	    });
	    fn = function(x) {
	      var i, item, j, len;
	      for (i = j = 0, len = x.length; j < len; i = ++j) {
	        item = x[i];
	        if (i === 0) {
	          item.isActive = true;
	        } else {
	          item.isActive = false;
	        }
	      }
	      return x;
	    };
	    out2 = update(out1, {
	      $apply: fn
	    });
	    this.setState({
	      config: update(this.state.config, {
	        focusLists: {
	          $set: out2
	        }
	      })
	    }, function() {
	      var it, item, j, l, len, len1, ref, ref1, targetItem;
	      if (id != null) {
	        targetItem = h.itemWithId(id, this.state.ItemList);
	        targetItem.isFolding = false;
	        ref = h.childzAncestorArray(targetItem, this.state.ItemList);
	        for (j = 0, len = ref.length; j < len; j++) {
	          it = ref[j];
	          it.isFolding = false;
	        }
	        return this.setState({
	          ItemList: this.state.ItemList
	        });
	      } else {
	        ref1 = this.state.ItemList;
	        for (l = 0, len1 = ref1.length; l < len1; l++) {
	          item = ref1[l];
	          if (item.isDir) {
	            item.isFolding = true;
	          }
	        }
	        return this.setState({
	          ItemList: this.state.ItemList
	        });
	      }
	    });
	  },
	  openFoldersAndFocusAndCloseMap: function(id) {
	    var fn, out1, out2, out3, out4;
	    out1 = update(this.state.config.focusLists, {
	      0: {
	        projectId: {
	          $set: id
	        }
	      }
	    });
	    fn = function(x) {
	      var i, item, j, len;
	      for (i = j = 0, len = x.length; j < len; i = ++j) {
	        item = x[i];
	        if (i === 0) {
	          item.isActive = true;
	        } else {
	          item.isActive = false;
	        }
	      }
	      return x;
	    };
	    out2 = update(out1, {
	      $apply: fn
	    });
	    console.log(out2);
	    out3 = update(this.state.config, {
	      focusLists: {
	        $set: out2
	      }
	    });
	    out4 = update(out3, {
	      isJumping: {
	        $set: false
	      }
	    });
	    return this.setState({
	      config: out4
	    }, function() {
	      var it, item, j, l, len, len1, ref, ref1, targetItem;
	      if (id != null) {
	        targetItem = h.itemWithId(id, this.state.ItemList);
	        targetItem.isFolding = false;
	        ref = h.childzAncestorArray(targetItem, this.state.ItemList);
	        for (j = 0, len = ref.length; j < len; j++) {
	          it = ref[j];
	          it.isFolding = false;
	        }
	        return this.setState({
	          ItemList: this.state.ItemList
	        });
	      } else {
	        ref1 = this.state.ItemList;
	        for (l = 0, len1 = ref1.length; l < len1; l++) {
	          item = ref1[l];
	          if (item.isDir) {
	            item.isFolding = true;
	          }
	        }
	        return this.setState({
	          ItemList: this.state.ItemList
	        });
	      }
	    });
	  },
	  openSmartFolderAndFocusAndCloseMap: function(positionInList) {
	    var fn, out1, out2, out3;
	    console.log(positionInList);
	    fn = function(x) {
	      var i, item, j, len;
	      for (i = j = 0, len = x.length; j < len; i = ++j) {
	        item = x[i];
	        if (i === positionInList) {
	          item.isActive = true;
	        } else {
	          item.isActive = false;
	        }
	      }
	      return x;
	    };
	    out1 = update(this.state.config.focusLists, {
	      $apply: fn
	    });
	    console.log(out1);
	    out2 = update(this.state.config, {
	      focusLists: {
	        $set: out1
	      }
	    });
	    out3 = update(out2, {
	      isJumping: {
	        $set: false
	      }
	    });
	    return this.setState({
	      config: out3
	    }, function() {
	      var focus, item, j, len, ref, targetItem;
	      focus = this.state.config.focusLists[positionInList];
	      if (focus.projectId != null) {
	        targetItem = h.itemWithId(focus.projectId, this.state.ItemList);
	        targetItem.isFolding = false;
	        return this.setState({
	          ItemList: this.state.ItemList
	        });
	      } else {
	        ref = this.state.ItemList;
	        for (j = 0, len = ref.length; j < len; j++) {
	          item = ref[j];
	          if (item.isDir) {
	            item.isFolding = false;
	          }
	        }
	        return this.setState({
	          ItemList: this.state.ItemList
	        });
	      }
	    });
	  },
	  openSmartFolderAndFocus: function(positionInList) {
	    var fn, out1;
	    console.log(positionInList);
	    fn = function(x) {
	      var i, item, j, len;
	      for (i = j = 0, len = x.length; j < len; i = ++j) {
	        item = x[i];
	        if (i === positionInList) {
	          item.isActive = true;
	        } else {
	          item.isActive = false;
	        }
	      }
	      return x;
	    };
	    out1 = update(this.state.config.focusLists, {
	      $apply: fn
	    });
	    return this.setState({
	      config: update(this.state.config, {
	        focusLists: {
	          $set: out1
	        }
	      })
	    }, function() {
	      var focus, item, j, len, ref, targetItem;
	      focus = this.state.config.focusLists[positionInList];
	      if (focus.projectId != null) {
	        targetItem = h.itemWithId(focus.projectId, this.state.ItemList);
	        targetItem.isFolding = false;
	        return this.setState({
	          ItemList: this.state.ItemList
	        });
	      } else {
	        ref = this.state.ItemList;
	        for (j = 0, len = ref.length; j < len; j++) {
	          item = ref[j];
	          if (item.isDir) {
	            item.isFolding = false;
	          }
	        }
	        return this.setState({
	          ItemList: this.state.ItemList
	        });
	      }
	    });
	  },
	  startEditing: function(e) {
	    if (this.state.ItemList.filter(function(ele) {
	      return ele.isSelected;
	    }).length === 0) {
	      alert("Please choose item first");
	      return;
	    }
	    return this.setState({
	      config: update(this.state.config, {
	        isEditing: {
	          $set: true
	        }
	      })
	    });
	  },
	  openMapToJump: function(e) {
	    return this.setState({
	      config: update(this.state.config, {
	        isJumping: {
	          $set: true
	        }
	      })
	    });
	  },
	  deleteItem: function(e) {
	    var pos;
	    if (this.state.ItemList.filter(function(ele) {
	      return ele.isSelected;
	    }).length === 0) {
	      alert("Please choose item first");
	      return;
	    }
	    console.log(e.target.dataset.id);
	    pos = h.itemPosInArray(this.state.ItemList.filter(function(ele) {
	      return ele.isSelected;
	    })[0].id, this.state.ItemList);
	    console.log(pos);
	    return this.setState({
	      ItemList: update(this.state.ItemList, {
	        $splice: [[pos, 1]]
	      })
	    });
	  },
	  dblClickHandler: function(id) {
	    this.setState({
	      config: update(this.state.config, {
	        isEditing: {
	          $set: true
	        }
	      })
	    });
	    h.itemWithId(id, this.state.ItemList).isSelected = true;
	    return this.setState({
	      ItemList: this.state.ItemList
	    });
	  },
	  handleModalCancel: function() {
	    this.setState({
	      config: update(this.state.config, {
	        isEditing: {
	          $set: false
	        }
	      })
	    });
	    this.state.ItemList.filter(function(ele) {
	      return ele.isSelected;
	    })[0].isSelected = false;
	    this.setState({
	      ItemList: this.state.ItemList
	    });
	  },
	  handleModalSave: function(item) {
	    var pos;
	    console.log(item);
	    this.setState({
	      config: update(this.state.config, {
	        isEditing: {
	          $set: false
	        }
	      })
	    });
	    pos = h.itemPosInArray(item.id, this.state.ItemList);
	    item.isSelected = false;
	    this.state.ItemList[pos] = item;
	    this.setState({
	      ItemList: h.dueConvert(this.state.ItemList)
	    });
	  }
	});

	React.render(vdom(ItemContainer, null), rdomid("testnode3"));
	

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(21);
	var hasDontEnumBug = !({ 'toString': null }).propertyIsEnumerable('toString');
	var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];

	var keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var ctor = object.constructor;
			var skipConstructor = ctor && ctor.prototype === object;

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};

	keysShim.shim = function shimObjectKeys() {
		if (!Object.keys) {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	module.exports = keysShim;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = moment;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Archive, Comments, Item, Project, RegEx, Tags, Task, UUID, _addItemsToIdzDecendent, _addItemsToIdzDecendent2, _convertLineToComment, _convertLineToProjectItem, _convertLineToTaskItem, _deserializeTag, _detectLineType, _eachLineOfContent, _getPosOfArray, _getPreviousItem, _getTagsFromLine, _itemWithId, _me, _returnChildItems, _returnDecendentItems, _swap, _traverseParent, _trimSpaceRightside, cloneObj, compareObj, h, isArray, isString, moment, myRegEx, p, plurals, typ, update,
	  slice = [].slice,
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

	_me = module.exports;

	moment = __webpack_require__(2);

	update = __webpack_require__(16).update;

	UUID = __webpack_require__(14);

	isArray = Array.isArray || function(value) {
	  return {}.toString.call(value) === '[object Array]';
	};

	isString = function(val) {
	  return typeof val === 'string';
	};

	h = {};

	h.checkItemDepth = function(item, itemListArr) {
	  var index, prtid;
	  index = 0;
	  prtid = item.parentId;
	  while (prtid != null) {
	    index += 1;
	    prtid = itemListArr.filter(function(x) {
	      return x.id === prtid;
	    })[0].parentId;
	  }
	  return index;
	};

	h.itemDepth = function(item, itemListArr) {
	  var fn, prtid;
	  prtid = item.parentId;
	  fn = function(item1, index) {
	    if (index == null) {
	      index = 0;
	    }
	    if (item1.parentId != null) {
	      return fn(h.itemWithId(item1.parentId, itemListArr), index + 1);
	    } else {
	      return index + 1;
	    }
	  };
	  return fn(item);
	};

	h.sortItemList_oldversion = function(IL) {
	  var add1, i1, it1, j, ref, ret;
	  ret = new ItemList([]);
	  ref = _returnChildItems(IL, "00000"), add1 = 1 <= ref.length ? slice.call(ref, 0) : [];
	  ret.push.apply(ret, add1);
	  for (j = add1.length - 1; j >= 0; j += -1) {
	    it1 = add1[j];
	    i1 = _getPosOfArray(it1, ret);
	    _addItemsToIdzDecendent(ret, IL, i1, it1.id);
	  }
	  IL = null;
	  return ret;
	};

	h.sortItemList = function(IL) {
	  var add1, i1, it1, j, ref, ret;
	  ret = [];
	  ref = _returnChildItems(IL, null), add1 = 1 <= ref.length ? slice.call(ref, 0) : [];
	  ret.push.apply(ret, add1);
	  for (j = add1.length - 1; j >= 0; j += -1) {
	    it1 = add1[j];
	    i1 = _getPosOfArray(it1, ret);
	    _addItemsToIdzDecendent(ret, IL, i1, it1.id);
	  }
	  IL = null;
	  return ret;
	};

	_addItemsToIdzDecendent = function(ret, items, pos, id) {
	  var add1, i1, it1, j, ref;
	  if (ret == null) {
	    ret = [];
	  }
	  ref = _returnChildItems(items, id), add1 = 1 <= ref.length ? slice.call(ref, 0) : [];
	  if (add1.length > 0) {
	    ret.splice.apply(ret, [pos + 1, 0].concat(slice.call(add1)));
	    for (j = add1.length - 1; j >= 0; j += -1) {
	      it1 = add1[j];
	      i1 = _getPosOfArray(it1, ret);
	      _addItemsToIdzDecendent(ret, items, i1, it1.id);
	    }
	  }
	  return ret;
	};

	_addItemsToIdzDecendent2 = function(ret, items, pos, id) {
	  var add1, i1, it1, j, ref;
	  if (ret == null) {
	    ret = [];
	  }
	  ref = _returnChildItems(items, id), add1 = 1 <= ref.length ? slice.call(ref, 0) : [];
	  if (add1.length > 0) {
	    ret.splice.apply(ret, [pos + 1, 0].concat(slice.call(add1)));
	    for (j = add1.length - 1; j >= 0; j += -1) {
	      it1 = add1[j];
	      i1 = _getPosOfArray(it1, ret);
	      _addItemsToIdzDecendent(ret, items, i1, it1.id);
	    }
	  }
	  return ret;
	};

	h.childzAncestorArray = function(child, IL) {
	  var _returnParent, arr;
	  arr = [];
	  _returnParent = function(item1, output) {
	    var t;
	    if ((item1 != null) && (item1.parentId != null)) {
	      t = IL.filter(function(ele) {
	        return ele.id === item1.parentId;
	      })[0];
	      if (t != null) {
	        output.push(t);
	      }
	      return _returnParent(t, output);
	    } else {
	      return output;
	    }
	  };
	  return _returnParent(child, arr);
	};

	h.returnInboxId = function(IL) {
	  var j, len, name, ref, t;
	  ref = ["inbox", "INBOX", "Inbox"];
	  for (j = 0, len = ref.length; j < len; j++) {
	    name = ref[j];
	    t = IL.filter(function(ele) {
	      return ele.name === name;
	    })[0];
	    if (t != null) {
	      return t.id;
	    }
	  }
	  return null;
	};

	_getPosOfArray = function(ele, array) {
	  var i, item, j, len;
	  for (i = j = 0, len = array.length; j < len; i = ++j) {
	    item = array[i];
	    if (item === ele) {
	      return i;
	    }
	  }
	};

	cloneObj = function(obj) {
	  var k, ret, v;
	  ret = {};
	  for (k in obj) {
	    if (!hasProp.call(obj, k)) continue;
	    v = obj[k];
	    ret[k] = v;
	  }
	  return ret;
	};

	myRegEx = {
	  repeatPhrase: /(now|n|d|due|)\+?(\d+)(days|day|d|weeks|week|wks|wk|w|months|month|mons|mon|m|)/
	};

	plurals = {
	  day: ["days", "day", "d"],
	  week: ["weeks", "week", "wks", "wk", "w"],
	  month: ["months", "month", "mons", "mon", "m"]
	};

	h.childrenUndone = function(parentId, IL) {
	  var item, j, len, ref;
	  ref = _returnChildItems(IL, parentId);
	  for (j = 0, len = ref.length; j < len; j++) {
	    item = ref[j];
	    h.itemUndone(item.id, IL);
	  }
	  return IL;
	};

	h.decendentUndone = function(parentId, IL) {
	  var item, j, len, ref;
	  ref = _returnDecendentItems(IL, parentId);
	  for (j = 0, len = ref.length; j < len; j++) {
	    item = ref[j];
	    h.itemUndone(item.id, IL);
	  }
	  return IL;
	};

	h.itemUndone = function(id, IL) {
	  var item;
	  item = _itemWithId(id, IL);
	  try {
	    delete item.tags["done"];
	  } catch (_error) {
	    null;
	  }
	  return IL;
	};

	h.childrenDone = function(parentId, IL) {
	  var item, j, len, ref;
	  ref = _returnChildItems(IL, parentId);
	  for (j = 0, len = ref.length; j < len; j++) {
	    item = ref[j];
	    h.itemDone(item.id, IL);
	  }
	  return IL;
	};

	h.decendentDone = function(parentId, IL) {
	  var item, j, len, ref;
	  ref = _returnDecendentItems(IL, parentId);
	  for (j = 0, len = ref.length; j < len; j++) {
	    item = ref[j];
	    h.itemDone(item.id, IL);
	  }
	  return IL;
	};

	h.itemPosInArray = function(id, IL) {
	  var i, item, j, len;
	  for (i = j = 0, len = IL.length; j < len; i = ++j) {
	    item = IL[i];
	    if (item.id === id) {
	      return i;
	    }
	  }
	};

	h.itemDone = function(id, IL) {
	  var diff, dtStr, item, mat, newItem, unit;
	  item = _itemWithId(id, IL);
	  item.tags.addTag({
	    "done": moment().format("YYYY-MM-DD")
	  });
	  if (h.isWithTag(item, "rep")) {
	    mat = myRegEx.repeatPhrase.exec(item.tags["rep"]);
	    if (mat != null) {
	      diff = Number(mat[2]);
	      unit = (function() {
	        var ref, ref1, ref2;
	        switch (false) {
	          case !(ref = mat[3], indexOf.call(plurals.day, ref) >= 0):
	            return "d";
	          case !(ref1 = mat[3], indexOf.call(plurals.week, ref1) >= 0):
	            return "w";
	          case !(ref2 = mat[3], indexOf.call(plurals.month, ref2) >= 0):
	            return "M";
	          default:
	            return "d";
	        }
	      })();
	      switch (mat[1]) {
	        case "n":
	        case "now":
	        case "":
	          console.log("here1");
	          dtStr = moment().add(diff, unit).format("YYYY-MM-DD");
	          break;
	        case "d":
	        case "due":
	          if (h.isWithTag(item, "due")) {
	            dtStr = moment(item.tags.due, "YYYY-MM-DD").add(diff, unit).format("YYYY-MM-DD");
	          } else {
	            dtStr = moment().add(diff, unit).format("YYYY-MM-DD");
	          }
	          break;
	        default:
	          null;
	      }
	    } else {
	      dtStr = moment().add(1, "d").format("YYYY-MM-DD");
	    }
	    newItem = new Task(item.name, item.parentId, new Tags(cloneObj(item.tags)), item.comments);
	    newItem.tags["due"] = dtStr;
	    delete newItem.tags["done"];
	    IL.push(newItem);
	  }
	  return IL;
	};

	_returnChildItems = function(items, parentId) {
	  var item, j, len, returnItems;
	  returnItems = [];
	  for (j = 0, len = items.length; j < len; j++) {
	    item = items[j];
	    if (item.parentId === parentId) {
	      returnItems.push(item);
	    }
	  }
	  return returnItems;
	};

	_returnDecendentItems = function(items, parentId, ret) {
	  var item, j, len;
	  if (ret == null) {
	    ret = [];
	  }
	  for (j = 0, len = items.length; j < len; j++) {
	    item = items[j];
	    if (item.parentId === parentId) {
	      ret.push(item);
	      _returnDecendentItems(items, item.id, ret);
	    }
	  }
	  return ret;
	};

	h.returnChildItems = function(IL, id) {
	  return _returnChildItems(IL, id);
	};

	h.returnDecendantItems = function(IL, id) {
	  return _returnDecendentItems(IL, id);
	};

	h.getIdList = function(IL) {
	  var item, j, len, ret;
	  ret = [];
	  try {
	    for (j = 0, len = IL.length; j < len; j++) {
	      item = IL[j];
	      ret.push(item.id);
	    }
	  } catch (_error) {
	    null;
	  }
	  return ret;
	};

	_itemWithId = function(id, IL) {
	  var item, j, len;
	  for (j = 0, len = IL.length; j < len; j++) {
	    item = IL[j];
	    if (item.id === id) {
	      return item;
	    }
	  }
	};

	h.returnItemsSelected = function(IL) {
	  var item, j, len, ret;
	  ret = [];
	  for (j = 0, len = IL.length; j < len; j++) {
	    item = IL[j];
	    if (item.isSelected) {
	      ret.push(item);
	    }
	  }
	  return item;
	};

	h.itemWithId = function(id, IL) {
	  return _itemWithId(id, IL);
	};

	h.removeItemFromItemList = function(id, IL) {
	  return IL.splice(_getPosOfArray(_itemWithId(id, IL), IL), 1);
	};

	h.isWithTag = function(item, tagStrOrArray) {
	  var itemTags, j, len, retFlag, tag, tagstr, v;
	  if (isString(tagStrOrArray)) {
	    return indexOf.call((function() {
	      var ref, results;
	      ref = item.tags;
	      results = [];
	      for (tag in ref) {
	        v = ref[tag];
	        results.push(tag);
	      }
	      return results;
	    })(), tagStrOrArray) >= 0;
	  } else if (isArray(tagStrOrArray)) {
	    retFlag = false;
	    itemTags = (function() {
	      var ref, results;
	      ref = item.tags;
	      results = [];
	      for (tag in ref) {
	        v = ref[tag];
	        results.push(tag);
	      }
	      return results;
	    })();
	    for (j = 0, len = tagStrOrArray.length; j < len; j++) {
	      tagstr = tagStrOrArray[j];
	      retFlag = retFlag || (indexOf.call(itemTags, tagstr) >= 0);
	    }
	    return retFlag;
	  }
	};

	h.includeTag = function(obj, tagStrOrArray) {
	  var itemTags, j, len, retFlag, tag, tagstr, v;
	  if (isString(tagStrOrArray)) {
	    return indexOf.call((function() {
	      var results;
	      results = [];
	      for (tag in obj) {
	        v = obj[tag];
	        results.push(tag);
	      }
	      return results;
	    })(), tagStrOrArray) >= 0;
	  } else if (isArray(tagStrOrArray)) {
	    retFlag = false;
	    itemTags = (function() {
	      var results;
	      results = [];
	      for (tag in obj) {
	        v = obj[tag];
	        results.push(tag);
	      }
	      return results;
	    })();
	    for (j = 0, len = tagStrOrArray.length; j < len; j++) {
	      tagstr = tagStrOrArray[j];
	      retFlag = retFlag || (indexOf.call(itemTags, tagstr) >= 0);
	    }
	    return retFlag;
	  }
	};

	h.isAncestorWithTag = function(item, tagStr, IL) {
	  var arr, it, j, len;
	  arr = h.childzAncestorArray(item, IL);
	  for (j = 0, len = arr.length; j < len; j++) {
	    it = arr[j];
	    if (h.isWithTag(it, tagStr)) {
	      return true;
	    }
	  }
	};

	h.ancestorTags = function(item, IL) {
	  var ancestor, arr, j, k, len, ref, ret, v;
	  arr = h.childzAncestorArray(item, IL);
	  ret = {};
	  for (j = 0, len = arr.length; j < len; j++) {
	    ancestor = arr[j];
	    ref = ancestor.tags;
	    for (k in ref) {
	      if (!hasProp.call(ref, k)) continue;
	      v = ref[k];
	      ret[k] = v;
	    }
	  }
	  return ret;
	};

	h.isAncestorFolding = function(id, IL) {
	  var flg, prt, self;
	  flg = false;
	  self = _itemWithId(id, IL);
	  try {
	    prt = _itemWithId(self.parentId, IL);
	    while (prt.parentId !== "0") {
	      flg = flg || prt.isFolding;
	      prt = _itemWithId(prt.parentId, IL);
	    }
	    return flg;
	  } catch (_error) {
	    return flg;
	  }
	};

	h.dueConvert = function(IL) {
	  var item, j, len;
	  for (j = 0, len = IL.length; j < len; j++) {
	    item = IL[j];
	    if (h.isWithTag(item, "today")) {
	      item.tags.addTag({
	        "due": moment().format("YYYY-MM-DD")
	      });
	      item.tags.removeTag(["today"]);
	    }
	    if (h.isWithTag(item, "tomorrow")) {
	      item.tags.addTag({
	        "due": moment().add(1, "days").format("YYYY-MM-DD")
	      });
	      item.tags.removeTag(["tomorrow"]);
	    }
	  }
	  return IL;
	};

	h.returnItemPath = function(IL, id) {
	  var path, prt, self;
	  path = "";
	  self = _itemWithId(id, IL);
	  try {
	    prt = _itemWithId(self.parentId, IL);
	    while ((prt.parentId != null)) {
	      path = prt.name + "/" + path;
	      prt = this.returnItem(prt.parentId);
	    }
	    if (path.slice(-1) === "/") {
	      path = path.slice(0, -1);
	    }
	    return path;
	  } catch (_error) {
	    return path;
	  }
	};

	h.childzPath = function(IL, id) {
	  var _returnParent, _t, arr, child;
	  arr = [];
	  child = _itemWithId(id, IL);
	  _returnParent = function(item1, output) {
	    var t;
	    if ((item1 != null) && (item1.parentId != null)) {
	      t = IL.filter(function(ele) {
	        return ele.id === item1.parentId;
	      })[0];
	      if (t != null) {
	        output.push(t);
	      }
	      return _returnParent(t, output);
	    } else {
	      return output;
	    }
	  };
	  _t = _returnParent(child, arr);
	  if (_t.length >= 1) {
	    return _t.reduceRight((function(out, val) {
	      return (out === "" ? "" + val.name : out + "/" + val.name);
	    }), "");
	  } else {
	    return "";
	  }
	};

	h.serialize = function(itemListArr) {
	  var childSerialize, serialized;
	  childSerialize = function(id, ind) {
	    var item, j, l, len, len1, line, ref, ref1, serialized;
	    serialized = "";
	    ref = _returnChildItems(itemListArr, id);
	    for (j = 0, len = ref.length; j < len; j++) {
	      item = ref[j];
	      ref1 = item.serialize().slice(0, -1).split("\n");
	      for (l = 0, len1 = ref1.length; l < len1; l++) {
	        line = ref1[l];
	        serialized += Array(ind + 1).join("\t") + line + "\n";
	      }
	      if (_returnChildItems(itemListArr, item.id).length > 0) {
	        serialized += childSerialize(item.id, ind + 1);
	      }
	    }
	    return serialized;
	  };
	  serialized = "";
	  if (itemListArr.length > 0) {
	    serialized += childSerialize(null, 0);
	    serialized = serialized.split("\n").map(function(line) {
	      return line.replace(/\s+$/g, "");
	    }).join("\n");
	  }
	  return serialized.slice(0, -1);
	};

	h.isDueInRange = function(item, start, end) {
	  var dtDue, dtEnd, dtStart;
	  if (item.tags["due"] == null) {
	    return false;
	  }
	  dtDue = moment(item.tags["due"], "YYYY-MM-DD").toDate();
	  if (start == null) {
	    dtEnd = moment().add(end, "d").toDate();
	    if (dtDue <= dtEnd) {
	      return true;
	    } else {
	      return false;
	    }
	  } else if (end == null) {
	    dtStart = moment().add(start, "d").toDate();
	    if (dtStart < dtDue) {
	      return true;
	    } else {
	      return false;
	    }
	  } else {
	    dtEnd = moment().add(end, "d").toDate();
	    dtStart = moment().add(start, "d").toDate();
	    if ((dtStart < dtDue && dtDue <= dtEnd)) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	};

	h.diffDueAndToday = function(str) {
	  var dtDue, dtNow;
	  dtDue = moment(str, "YYYY-MM-DD");
	  dtNow = moment().startOf("day");
	  return dtDue.diff(dtNow, "days");
	};

	_me.h = h;

	Tags = (function() {
	  function Tags(dict) {
	    var key, val;
	    if (dict == null) {
	      dict = {};
	    }
	    for (key in dict) {
	      val = dict[key];
	      this[key] = val;
	    }
	  }

	  Tags.prototype.serialize = function() {
	    var name, name1, serialized, value, value1;
	    serialized = "";
	    for (name in this) {
	      if (!hasProp.call(this, name)) continue;
	      value = this[name];
	      name1 = name.trim();
	      value1 = value.trim();
	      serialized += " @" + name1;
	      if (value !== "") {
	        serialized += "(" + value1 + ")";
	      }
	    }
	    serialized += " ";
	    return serialized;
	  };

	  Tags.prototype.addTag = function(dict) {
	    var key, results, val;
	    results = [];
	    for (key in dict) {
	      val = dict[key];
	      results.push(this[key] = val);
	    }
	    return results;
	  };

	  Tags.prototype.removeTag = function(arr) {
	    var j, key, len, results;
	    results = [];
	    for (j = 0, len = arr.length; j < len; j++) {
	      key = arr[j];
	      try {
	        results.push(delete this[key]);
	      } catch (_error) {
	        results.push(null);
	      }
	    }
	    return results;
	  };

	  return Tags;

	})();

	Comments = (function(superClass) {
	  extend(Comments, superClass);

	  function Comments() {
	    var arr, itm, j, len;
	    arr = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    for (j = 0, len = arr.length; j < len; j++) {
	      itm = arr[j];
	      this.push(itm);
	    }
	  }

	  Comments.prototype.serialize = function() {
	    var comment, j, len, serialized;
	    serialized = "";
	    for (j = 0, len = this.length; j < len; j++) {
	      comment = this[j];
	      serialized += "\t" + comment + "\n";
	    }
	    serialized = serialized.split("\n").map(function(line) {
	      return line.replace(/\s+$/g, "");
	    }).join("\n");
	    return serialized;
	  };

	  Comments.prototype.addComment = function(val) {
	    return this.push(val);
	  };

	  Comments.prototype.addComments = function(valArr) {
	    var j, len, results, val;
	    results = [];
	    for (j = 0, len = valArr.length; j < len; j++) {
	      val = valArr[j];
	      results.push(this.push(val));
	    }
	    return results;
	  };

	  return Comments;

	})(Array);

	Item = (function() {
	  function Item(name, parentId, tags, comments) {
	    if (parentId == null) {
	      parentId = null;
	    }
	    if (tags == null) {
	      tags = new Tags();
	    }
	    if (comments == null) {
	      comments = new Comments();
	    }
	    this.id = UUID.genV4().toString();
	    this.name = name;
	    this.tags = tags;
	    this.comments = comments;
	    this.isDir;
	    this.parentId = parentId;
	    this.isDone = false;
	    this.isSelected = false;
	    this.control = {
	      isSelected: false,
	      isEditing: false
	    };
	    return this.id;
	  }

	  return Item;

	})();

	Task = (function(superClass) {
	  extend(Task, superClass);

	  function Task(name, parentId, tags, comments) {
	    var _id;
	    if (parentId == null) {
	      parentId = null;
	    }
	    if (tags == null) {
	      tags = new Tags();
	    }
	    if (comments == null) {
	      comments = new Comments();
	    }
	    _id = Task.__super__.constructor.call(this, name, parentId, tags, comments);
	    this.isDir = false;
	    return _id;
	  }

	  Task.prototype.serialize = function() {
	    var key, serialized, value;
	    serialized = "- " + this.name;
	    if (((function() {
	      var ref, results;
	      ref = this.tags;
	      results = [];
	      for (key in ref) {
	        value = ref[key];
	        results.push(key);
	      }
	      return results;
	    }).call(this)).length > 0) {
	      serialized += "";
	      serialized += this.tags.serialize();
	    }
	    serialized += "\n";
	    if (this.comments.length > 0) {
	      serialized += this.comments.serialize();
	    }
	    serialized = serialized.split("\n").map(function(line) {
	      return line.replace(/\s+$/g, "");
	    }).join("\n");
	    return serialized;
	  };

	  return Task;

	})(Item);

	Project = (function(superClass) {
	  extend(Project, superClass);

	  function Project(name, parentId, tags, comments) {
	    var _id;
	    if (parentId == null) {
	      parentId = null;
	    }
	    if (tags == null) {
	      tags = new Tags();
	    }
	    if (comments == null) {
	      comments = new Comments();
	    }
	    _id = Project.__super__.constructor.call(this, name, parentId, tags, comments);
	    this.isDir = true;
	    if (name === "inbox" || name === "INBOX" || name === "Inbox") {
	      this.isFolding = false;
	    } else {
	      this.isFolding = true;
	    }
	    return _id;
	  }

	  Project.prototype.serialize = function() {
	    var key, serialized, value;
	    serialized = this.name;
	    if (((function() {
	      var ref, results;
	      ref = this.tags;
	      results = [];
	      for (key in ref) {
	        value = ref[key];
	        results.push(key);
	      }
	      return results;
	    }).call(this)).length > 0) {
	      serialized += "";
	      serialized += this.tags.serialize();
	    }
	    serialized = serialized.trim() + ":";
	    serialized += "\n";
	    if (this.comments.length > 0) {
	      serialized += this.comments.serialize();
	    }
	    return serialized;
	  };

	  return Project;

	})(Item);

	Archive = (function(superClass) {
	  extend(Archive, superClass);

	  function Archive(name, parentId, tags, comments) {
	    var _id;
	    if (name == null) {
	      name = "Archive";
	    }
	    if (parentId == null) {
	      parentId = null;
	    }
	    if (tags == null) {
	      tags = new Tags();
	    }
	    if (comments == null) {
	      comments = new Comments();
	    }
	    _id = Archive.__super__.constructor.call(this, name, parentId, tags, comments);
	    return _id;
	  }

	  Archive.prototype.serialize = function() {
	    var serialized;
	    serialized = "＿＿＿＿＿＿＿＿＿＿\n";
	    serialized += Archive.__super__.serialize.call(this);
	    return serialized;
	  };

	  return Archive;

	})(Project);

	RegEx = {
	  endColon: /\:$/,
	  endParen: /\)$/,
	  fullTag: /^@.+\)$/,
	  startAt: /^@/,
	  startDash: /^(\s+)?\-\ /,
	  startTab: /^\t+/,
	  startWhitespace: /^\s+/,
	  bothParens: /\(.+\)/,
	  preArchiveLoDashes: /^\s*＿{2,}.*$/,
	  configLine: /^\s*\$config\:/
	};

	p = {};

	p.parseTPStringToTPObject = function(content) {
	  var j, lastIndentProjectIds, len, line, line1, lineIndent, ref, returnArr, t;
	  returnArr = [];
	  lastIndentProjectIds = [null];
	  ref = _eachLineOfContent(content);
	  for (j = 0, len = ref.length; j < len; j++) {
	    line1 = ref[j];
	    lineIndent = line1.split("\t").length - 1;
	    line = line1.replace(/\s+$/, "");
	    if (line.match(RegEx.endColon)) {
	      t = _convertLineToProjectItem(line, lastIndentProjectIds[lineIndent]);
	      returnArr.push(t);
	      lastIndentProjectIds[lineIndent + 1] = t.id;
	    } else if (line.match(RegEx.startDash)) {
	      returnArr.push(_convertLineToTaskItem(line, lastIndentProjectIds[lineIndent]));
	    } else if (line.match(RegEx.preArchiveLoDashes)) {
	      null;
	    } else if (line.match(RegEx.configLine)) {
	      null;
	    } else {
	      if (returnArr.length === 0) {
	        null;
	      } else {
	        returnArr.slice(-1)[0].comments.push(_convertLineToComment(line));
	      }
	    }
	  }
	  return returnArr;
	};

	p.convertLineToItem = function(line, parentId) {
	  if (parentId == null) {
	    parentId = null;
	  }
	  if (line.match(RegEx.endColon)) {
	    return _convertLineToProjectItem(line);
	  } else {
	    return _convertLineToTaskItem(line);
	  }
	};

	p.convertLineToTaskItem = function(line, parentId) {
	  var merge, newTask, tags, tap, taskname;
	  if (parentId == null) {
	    parentId = null;
	  }
	  taskname = line.replace(RegEx.startDash, "").replace(/\ @.+/, "");
	  merge = function(xs) {
	    if ((xs != null ? xs.length : void 0) > 0) {
	      return tap({}, function(m) {
	        var j, k, len, results, v, x;
	        results = [];
	        for (j = 0, len = xs.length; j < len; j++) {
	          x = xs[j];
	          results.push((function() {
	            var results1;
	            results1 = [];
	            for (k in x) {
	              v = x[k];
	              results1.push(m[k] = v);
	            }
	            return results1;
	          })());
	        }
	        return results;
	      });
	    }
	  };
	  tap = function(o, fn) {
	    fn(o);
	    return o;
	  };
	  tags = new Tags(merge(_getTagsFromLine(line).map(_deserializeTag)));
	  newTask = new Task(taskname, parentId, tags);
	  return newTask;
	};

	_getTagsFromLine = function(line) {
	  var insideTag;
	  insideTag = false;
	  return line.replace(":", "").split(" ").reduce((function(memo, word) {
	    if (word.match(RegEx.startAt)) {
	      memo.push(word);
	      if (!word.match(RegEx.fullTag) || !(word.indexOf("(") < 0 && word.indexOf(")") < 0)) {
	        insideTag = true;
	      }
	    } else if (insideTag) {
	      memo[memo.length - 1] += " " + word;
	      if (word.match(RegEx.endParen)) {
	        insideTag = false;
	      }
	    }
	    return memo;
	  }), []);
	};

	_deserializeTag = function(tag) {
	  var deserialized, parenIndex, returnTag;
	  deserialized = tag.replace(RegEx.startAt, "");
	  returnTag = {};
	  if (deserialized.match(RegEx.bothParens)) {
	    parenIndex = deserialized.indexOf("(");
	    returnTag[deserialized.substr(0, parenIndex)] = deserialized.substr(parenIndex + 1, deserialized.length - parenIndex - 2);
	  } else {
	    returnTag[deserialized] = "";
	  }
	  return returnTag;
	};

	_convertLineToProjectItem = function(line, parentId) {
	  var merge, newProj, projectName, tags, tap;
	  if (parentId == null) {
	    parentId = null;
	  }
	  projectName = line.slice(0, -1).replace(RegEx.startTab, "").replace(/\ @.+/, "").trim();
	  merge = function(xs) {
	    if ((xs != null ? xs.length : void 0) > 0) {
	      return tap({}, function(m) {
	        var j, k, len, results, v, x;
	        results = [];
	        for (j = 0, len = xs.length; j < len; j++) {
	          x = xs[j];
	          results.push((function() {
	            var results1;
	            results1 = [];
	            for (k in x) {
	              v = x[k];
	              results1.push(m[k] = v);
	            }
	            return results1;
	          })());
	        }
	        return results;
	      });
	    }
	  };
	  tap = function(o, fn) {
	    fn(o);
	    return o;
	  };
	  tags = new Tags(merge(_getTagsFromLine(line).map(_deserializeTag)));
	  newProj = projectName === "Archive" ? new Archive(projectName, parentId, tags) : new Project(projectName, parentId, tags);
	  return newProj;
	};

	_convertLineToTaskItem = function(line, parentId) {
	  var merge, newTask, tags, tap, taskname;
	  if (parentId == null) {
	    parentId = null;
	  }
	  taskname = line.replace(RegEx.startDash, "").replace(/\ @.+/, "");
	  merge = function(xs) {
	    if ((xs != null ? xs.length : void 0) > 0) {
	      return tap({}, function(m) {
	        var j, k, len, results, v, x;
	        results = [];
	        for (j = 0, len = xs.length; j < len; j++) {
	          x = xs[j];
	          results.push((function() {
	            var results1;
	            results1 = [];
	            for (k in x) {
	              v = x[k];
	              results1.push(m[k] = v);
	            }
	            return results1;
	          })());
	        }
	        return results;
	      });
	    }
	  };
	  tap = function(o, fn) {
	    fn(o);
	    return o;
	  };
	  tags = new Tags(merge(_getTagsFromLine(line).map(_deserializeTag)));
	  newTask = new Task(taskname, parentId, tags);
	  return newTask;
	};

	_convertLineToComment = function(line) {
	  return line.replace(RegEx.startWhitespace, "");
	};

	_eachLineOfContent = function(content) {
	  try {
	    return content.split("\n");
	  } catch (_error) {
	    return "";
	  }
	};

	_trimSpaceRightside = function(line) {
	  return line.replace(/\s+$/, "");
	};

	_detectLineType = function(line) {
	  var k, ref, v;
	  ref = {
	    project: RegEx.endColon,
	    task: RegEx.startDash,
	    noitem: RegEx.preArchiveLoDashes
	  };
	  for (k in ref) {
	    v = ref[k];
	    if (_trimSpaceRightside(line).match(v)) {
	      return k;
	    }
	  }
	  return "comment";
	};

	_traverseParent = function() {
	  return null;
	};

	p.parseTPStringToUpdateTPObj = function(IL, newtxt) {
	  var j, lastIndentProjectIds, len, line, line1, lineIndent, ref, returnArr, t, t2;
	  returnArr = [];
	  lastIndentProjectIds = [null];
	  ref = _eachLineOfContent(newtxt);
	  for (j = 0, len = ref.length; j < len; j++) {
	    line1 = ref[j];
	    lineIndent = line1.split("\t").length - 1;
	    line = line1.replace(/\s+$/, "");
	    if (line.match(RegEx.endColon)) {
	      t = _convertLineToProjectItem(line, lastIndentProjectIds[lineIndent]);
	      t2 = _getPreviousItem(IL, t);
	      if (t2 != null) {
	        t.id = t2.id;
	        t.isFolding = t2.isFolding;
	        t.isSelected = t2.isSelected;
	      }
	      returnArr.push(t);
	      lastIndentProjectIds[lineIndent + 1] = t.id;
	    } else if (line.match(RegEx.startDash)) {
	      t = _convertLineToTaskItem(line, lastIndentProjectIds[lineIndent]);
	      t2 = _getPreviousItem(IL, t);
	      if (t2 != null) {
	        t.id = t2.id;
	        t.isSelected = t2.isSelected;
	      }
	      returnArr.push(t);
	    } else if (line.match(RegEx.preArchiveLoDashes)) {
	      null;
	    } else {
	      if (returnArr.length === 0) {
	        null;
	      } else {
	        returnArr.slice(-1)[0].comments.push(_convertLineToComment(line));
	      }
	    }
	  }
	  return returnArr;
	};

	typ = {
	  isObject: function(v) {
	    return Object.prototype.toString.call(v) === "[object Object]";
	  },
	  isHash: function(v) {
	    var t;
	    if (Object.prototype.toString.call(v) === "[object Object]") {
	      for (t in v) {
	        t = t;
	        if (v[t] !== void 0) {
	          return true;
	        } else {
	          return false;
	        }
	      }
	    }
	  },
	  isFunction: function(v) {
	    return Object.prototype.toString.call(v) === "[object Function]";
	  },
	  isArray: function(v) {
	    return Object.prototype.toString.call(v) === "[object Array]";
	  },
	  isBoolean: function(v) {
	    return Object.prototype.toString.call(v) === "[object Boolean]";
	  },
	  isString: function(v) {
	    return Object.prototype.toString.call(v) === "[object String]";
	  },
	  isNumber: function(v) {
	    return Object.prototype.toString.call(v) === "[object Number]";
	  },
	  isElement: function(v) {
	    var check;
	    check = false;
	    switch (Object.prototype.toString.call(v)) {
	      case "[object Object]":
	        if (v.length) {
	          check = true;
	        }
	        break;
	      case "[object Window]":
	      case "[object HTMLParagraphElement]":
	        if (!typ.isUndefined(v) && !typ.isNull(v)) {
	          check = true;
	        }
	        break;
	      default:
	        break;
	    }
	    return check;
	  },
	  isElementCollection: function(v) {
	    return Object.prototype.toString.call(v) === "[object HTMLCollection]";
	  },
	  isNull: function(v) {
	    return v === null;
	  },
	  isUndefined: function(v) {
	    return v === "undefined";
	  },
	  getType: function(v) {
	    if (typ.isNull(v)) {
	      return "null";
	    }
	    if (typ.isUndefined(v)) {
	      return "undefined";
	    }
	    if (typ.isElement(v)) {
	      return "HTMLElement";
	    }
	    if (typ.isHash(v)) {
	      return "Hash";
	    }
	    return Object.prototype.toString.call(v).split(" ")[1].replace("]", "");
	  }
	};

	compareObj = function(obj1, obj2) {
	  var k, key, v;
	  if (((function() {
	    var results;
	    results = [];
	    for (k in obj1) {
	      v = obj1[k];
	      results.push(k);
	    }
	    return results;
	  })()).length !== ((function() {
	    var results;
	    results = [];
	    for (k in obj2) {
	      v = obj2[k];
	      results.push(k);
	    }
	    return results;
	  })()).length) {
	    return false;
	  } else {
	    for (key in obj1) {
	      v = obj1[key];
	      if (!(indexOf.call((function() {
	        var results;
	        results = [];
	        for (k in obj2) {
	          v = obj2[k];
	          results.push(k);
	        }
	        return results;
	      })(), key) >= 0)) {
	        return false;
	      } else {
	        for (k in obj1) {
	          v = obj1[k];
	          if (typ.isObject(v) || typ.isArray(v)) {
	            if (!compareObj(v, obj2[k])) {
	              return false;
	            }
	          } else {
	            if (v !== obj2[k]) {
	              return false;
	            }
	          }
	        }
	      }
	    }
	  }
	  return true;
	};

	_getPreviousItem = function(oldIL, newItem) {
	  var ret;
	  ret = null;
	  ret = oldIL.filter(function(ele) {
	    return ele.name === newItem.name;
	  });
	  if (ret.length === 1) {
	    return ret[0];
	  } else {
	    ret = ret.filter(function(ele) {
	      return compareObj(newItem.tags, ele.tags);
	    });
	    if (ret.length === 1) {
	      return ret[0];
	    } else {
	      ret = ret.filter(function(ele) {
	        return compareObj(newItem.comments, ele.comments);
	      });
	      if (ret.length === 1) {
	        return ret[0];
	      } else {
	        return null;
	      }
	    }
	  }
	};

	_swap = function(arr) {
	  var i, j, k, len, ret;
	  ret = {};
	  for (i = j = 0, len = arr.length; j < len; i = ++j) {
	    k = arr[i];
	    ret[k] = i;
	  }
	  return ret;
	};

	_me.p = p;

	_me.Project = Project;

	_me.Task = Task;

	_me.Tags = Tags;

	_me.Comments = Comments;

	_me.Archive = Archive;
	

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var React, icons, vdom,
	  hasProp = {}.hasOwnProperty;

	React = __webpack_require__(16);

	vdom = React.createElement;

	icons = {};

	icons.iconSquare = function() {
	  return vdom("svg", {
	    className: "icon icon-check",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M170.667 42.667h682.667c35.333 0 65.5 12.5 90.5 37.5s37.5 55.167 37.5 90.5v682.667c0 35.333-12.5 65.5-37.5 90.5s-55.167 37.5-90.5 37.5h-682.667c-35.333 0-65.5-12.5-90.5-37.5s-37.5-55.167-37.5-90.5v-682.667c0-35.333 12.5-65.5 37.5-90.5s55.167-37.5 90.5-37.5zM853.333 128h-682.667c-11.777 0-21.833 4.167-30.167 12.5s-12.5 18.389-12.5 30.167v682.667c0 11.777 4.167 21.833 12.5 30.167s18.389 12.5 30.167 12.5h682.667c11.777 0 21.833-4.167 30.167-12.5s12.5-18.389 12.5-30.167v-682.667c0-11.777-4.167-21.833-12.5-30.167s-18.389-12.5-30.167-12.5z"
	  }));
	};

	icons.iconSquareCheck = function() {
	  return vdom("svg", {
	    className: "icon icon-check icon-checked",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M771.625 312.797c11.565 0 21.568 4.171 30.016 12.512s12.672 18.4 12.672 30.176c0 11.776-4.224 21.888-12.672 30.336l-354.864 353.309c-8.213 8.215-18.221 12.32-30.016 12.32-12.013 0-22.125-4.105-30.336-12.32l-163.361-163.36c-8.213-8.211-12.32-18.323-12.32-30.336 0-11.776 4.171-21.833 12.512-30.176 8.341-8.339 18.4-12.512 30.176-12.512 11.563 0 21.568 4.224 30.016 12.672l133.025 133.344 324.848-323.293c8.448-8.448 18.56-12.672 30.336-12.672h-0.032z"
	  }), vdom("path", {
	    className: "path2",
	    d: "M170.656 42.656h682.656c35.328 0 65.493 12.501 90.496 37.504s37.504 55.168 37.504 90.496v682.656c0 35.328-12.501 65.493-37.504 90.496s-55.168 37.504-90.496 37.504h-682.656c-35.328 0-65.493-12.501-90.496-37.504s-37.504-55.168-37.504-90.496v-682.656c0-35.328 12.501-65.493 37.504-90.496s55.168-37.504 90.496-37.504zM853.344 128h-682.656c-11.776 0-21.835 4.171-30.176 12.512s-12.512 18.4-12.512 30.176v682.656c0 11.776 4.171 21.833 12.512 30.176s18.4 12.512 30.176 12.512h682.656c11.776 0 21.833-4.169 30.176-12.512s12.512-18.4 12.512-30.176v-682.656c0-11.776-4.169-21.835-12.512-30.176s-18.4-12.512-30.176-12.512z"
	  }));
	};

	icons.iconFolderOpen = function(cls) {
	  if (cls == null) {
	    cls = "icon-folder-open";
	  }
	  return vdom("svg", {
	    className: "icon " + cls,
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M170.667 85.333h213.333l85.333 128h384c35.333 0 65.333 12.667 90.667 37.333 24.667 25.333 37.333 55.333 37.333 90.667v469.333c0 35.333-12.667 65.333-37.333 90.667-25.333 24.667-55.333 37.333-90.667 37.333h-682.667c-35.333 0-65.333-12.667-90.667-37.333-24.667-25.333-37.333-55.333-37.333-90.667v-597.333c0-35.333 12.667-65.333 37.333-90.667 25.333-24.667 55.333-37.333 90.667-37.333zM424 298.667l-82.667-128h-170.667c-12 0-22 4-30 12.667-8.667 8-12.667 18-12.667 30v597.333c0 8.667 2 16 6 22.667 0 0 158.667-432.667 158.667-432.667l1.333 0.667v-0.667h602v-59.333c0-12-4-22-12.667-30-8-8.667-18-12.667-30-12.667h-429.333zM212 853.333c0 0 641.333 0 641.333 0 12 0 22-4 30-12.667 8.667-8 12.667-18 12.667-30 0 0 0-210.667 0-330 0 0-547.333 0-547.333 0-41.333 113.333-136.667 372.667-136.667 372.667zM981.333 400.667v0z"
	  }));
	};

	icons.iconFolder = function() {
	  return vdom("svg", {
	    className: "icon icon-folder",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M170.667 85.333h213.333l85.333 128h384q53 0 90.5 37.5t37.5 90.5v469.333q0 53-37.5 90.5t-90.5 37.5h-682.667q-53 0-90.5-37.5t-37.5-90.5v-597.333q0-53 37.5-90.5t90.5-37.5zM423.667 298.667l-82.333-128h-170.667q-17.667 0-30.167 12.5t-12.5 30.167v597.333q0 17.667 12.5 30.167t30.167 12.5h682.667q17.667 0 30.167-12.5t12.5-30.167v-469.333q0-17.667-12.5-30.167t-30.167-12.5h-429.667z"
	  }));
	};

	icons.iconInfo = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M448 304c0-26.4 21.6-48 48-48h32c26.4 0 48 21.6 48 48v32c0 26.4-21.6 48-48 48h-32c-26.4 0-48-21.6-48-48v-32z"
	  }), vdom("path", {
	    className: "path2",
	    d: "M640 768h-256v-64h64v-192h-64v-64h192v256h64z"
	  }), vdom("path", {
	    className: "path3",
	    d: "M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 416z"
	  }));
	};

	icons.iconComment = function(comments) {
	  var k, v;
	  if (((function() {
	    var results;
	    results = [];
	    for (k in comments) {
	      if (!hasProp.call(comments, k)) continue;
	      v = comments[k];
	      results.push(k);
	    }
	    return results;
	  })()).length > 0) {
	    return vdom("svg", {
	      className: "icon icon-comment",
	      viewBox: "0 0 1024 1024"
	    }, vdom("path", {
	      className: "path1",
	      d: "M170.667 42.667h682.667c35.328 0 65.493 12.501 90.496 37.504s37.504 55.168 37.504 90.496v469.333c0 35.328-12.501 65.493-37.504 90.496s-55.168 37.504-90.496 37.504h-341.333l-298.667 213.333v-213.333h-42.667c-35.328 0-65.493-12.501-90.496-37.504s-37.504-55.168-37.504-90.496v-469.333c0-35.328 12.501-65.493 37.504-90.496s55.168-37.504 90.496-37.504z"
	    }));
	  }
	};

	icons.iconTag = function() {
	  return vdom("svg", {
	    className: "icon icon-tag",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M42.667 42.667h482.667l418.667 418.333q37.333 37.333 37.333 90.333 0 53.333-37.333 90.667l-302 302q-37.333 37.333-90.333 37.333-53.333 0-90.667-37.333l-418.333-418.667v-482.667zM883.667 521.333l-393.667-393.333h-362v362l393.333 393.667q12.667 12.333 30.333 12.333t30-12.333l302-302q12.333-12.333 12.333-30t-12.333-30.333zM362.667 256q44.333 0 75.5 31.167t31.167 75.5-31.167 75.5-75.5 31.167-75.5-31.167-31.167-75.5 31.167-75.5 75.5-31.167zM362.667 341.333q-8.667 0-15 6.333t-6.333 15 6.333 15 15 6.333 15-6.333 6.333-15-6.333-15-15-6.333z"
	  }));
	};

	icons.iconCancelCircle = function() {
	  return vdom("svg", {
	    className: "icon icon-cancel-circle",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zM512 928c-229.75 0-416-186.25-416-416s186.25-416 416-416 416 186.25 416 416-186.25 416-416 416z"
	  }), vdom("path", {
	    className: "path2",
	    d: "M672 256l-160 160-160-160-96 96 160 160-160 160 96 96 160-160 160 160 96-96-160-160 160-160z"
	  }));
	};

	icons.iconSolidCircleToday = function() {
	  return vdom("svg", {
	    className: "icon icon-solid-circle icon-today",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512z"
	  }));
	};

	icons.iconSolidCircleHigh = function() {
	  return vdom("svg", {
	    className: "icon icon-solid-circle icon-high",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512z"
	  }));
	};

	icons.iconSolidCircleOverdue = function() {
	  return vdom("svg", {
	    className: "icon icon-solid-circle icon-overdue",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512z"
	  }));
	};

	icons.iconSolidCircleInWeek = function() {
	  return vdom("svg", {
	    className: "icon icon-solid-circle icon-inweek",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512z"
	  }));
	};

	icons.iconSolidCircleTomorrow = function() {
	  return vdom("svg", {
	    className: "icon icon-solid-circle icon-tomorrow",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512z"
	  }));
	};

	icons.iconOneCircle = function(className, keyId) {
	  return vdom("svg", {
	    className: "icon icon-dot",
	    viewBox: "0 0 1024 1024",
	    key: keyId
	  }, vdom("path", {
	    className: "path1 icon-" + className,
	    d: "M512 42.667c63.774 0 124.599 12.387 182.485 37.163s107.776 58.112 149.675 100.011c41.899 41.899 75.234 91.79 100.011 149.675s37.163 118.711 37.163 182.485c0 63.774-12.386 124.599-37.163 182.485s-58.112 107.776-100.011 149.675c-41.899 41.899-91.789 75.234-149.675 100.011s-118.711 37.163-182.485 37.163c-63.774 0-124.601-12.386-182.485-37.163s-107.776-58.112-149.675-100.011c-41.899-41.899-75.235-91.789-100.011-149.675s-37.163-118.711-37.163-182.485c0-63.774 12.387-124.601 37.163-182.485s58.112-107.776 100.011-149.675c41.899-41.899 91.79-75.235 149.675-100.011s118.711-37.163 182.485-37.163z"
	  }));
	};

	icons.iconTwoCircle = function(className1, className2) {
	  return vdom("svg", {
	    className: "icon icon-dot",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1 icon-" + className1,
	    d: "M512 298.667c-28.898 0-56.503 5.661-82.816 16.981-26.311 11.321-48.981 26.482-68.011 45.483s-34.19 41.671-45.483 68.011c-11.293 26.338-16.953 53.943-16.981 82.816s5.632 56.478 16.981 82.816c11.349 26.338 26.51 49.011 45.483 68.011s41.643 34.163 68.011 45.483c26.368 11.319 53.973 16.981 82.816 16.981s56.448-5.662 82.816-16.981c26.368-11.319 49.037-26.483 68.011-45.483s34.133-41.673 45.483-68.011c11.349-26.338 17.011-53.943 16.981-82.816s-5.687-56.478-16.981-82.816c-11.294-26.339-26.453-49.010-45.483-68.011s-41.698-34.162-68.011-45.483c-26.313-11.321-53.918-16.981-82.816-16.981z"
	  }), vdom("path", {
	    className: "path2 icon-" + className2,
	    d: "M512 42.667c-63.774 0-124.601 12.387-182.485 37.163s-107.776 58.112-149.675 100.011c-41.899 41.899-75.235 91.79-100.011 149.675s-37.163 118.711-37.163 182.485c0 63.774 12.387 124.599 37.163 182.485s58.112 107.776 100.011 149.675c41.899 41.899 91.79 75.234 149.675 100.011s118.711 37.163 182.485 37.163c63.774 0 124.599-12.386 182.485-37.163s107.776-58.112 149.675-100.011c41.899-41.899 75.234-91.789 100.011-149.675s37.163-118.711 37.163-182.485c0-63.774-12.386-124.601-37.163-182.485s-58.112-107.776-100.011-149.675c-41.899-41.899-91.789-75.235-149.675-100.011s-118.711-37.163-182.485-37.163zM512 213.333c40.448 0 79.117 7.893 116.011 23.68s68.663 37.006 95.317 63.659c26.654 26.653 47.872 58.425 63.659 95.317 15.787 36.894 23.68 75.563 23.68 116.011s-7.893 79.117-23.68 116.011c-15.787 36.894-37.005 68.663-63.659 95.317s-58.423 47.872-95.317 63.659c-36.894 15.787-75.563 23.68-116.011 23.68s-79.117-7.893-116.011-23.68c-36.893-15.787-68.665-37.005-95.317-63.659s-47.872-58.423-63.659-95.317c-15.787-36.894-23.68-75.563-23.68-116.011s7.893-79.117 23.68-116.011c15.787-36.893 37.006-68.665 63.659-95.317s58.425-47.872 95.317-63.659c36.894-15.787 75.563-23.68 116.011-23.68z"
	  }));
	};

	icons.iconOneCircle2Part = function(className1, className2, keyId) {
	  return vdom("svg", {
	    className: "icon icon-dot",
	    viewBox: "0 0 1024 1024",
	    key: keyId
	  }, vdom("path", {
	    className: "path1 icon-" + className1,
	    d: "M981.333 512c-938.667 0 0 0-938.667 0 0 63.774 12.386 124.599 37.163 182.485s58.112 107.776 100.011 149.675c41.899 41.899 91.789 75.234 149.675 100.011s118.711 37.163 182.485 37.163c63.774 0 124.601-12.386 182.485-37.163s107.776-58.112 149.675-100.011c41.899-41.899 75.235-91.789 100.011-149.675s37.163-118.711 37.163-182.485z"
	  }), vdom("path", {
	    className: "path2 icon-" + className2,
	    d: "M981.333 512c-938.667 0 0 0-938.667 0 0-63.774 12.386-124.601 37.163-182.485s58.112-107.776 100.011-149.675c41.899-41.899 91.789-75.235 149.675-100.011s118.711-37.163 182.485-37.163c63.774 0 124.601 12.387 182.485 37.163s107.776 58.112 149.675 100.011c41.899 41.899 75.235 91.79 100.011 149.675s37.163 118.711 37.163 182.485z"
	  }));
	};

	icons.iconUpDown = function() {
	  return vdom("svg", {
	    className: "icon icon-toggle",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M372.332 53.411l211.189 211.19c8.328 8.328 12.493 18.384 12.493 30.169s-4.164 21.841-12.493 30.169c-8.328 8.328-18.384 12.493-30.169 12.493s-21.841-4.165-30.169-12.493l-138.359-138.357 0.236 379.245c0 11.943-4.164 22.077-12.492 30.405s-18.424 12.453-30.288 12.375c-11.863-0.079-21.959-4.281-30.287-12.609-8.015-8.015-12.257-18.071-12.728-30.171l0.235-379.245-138.357 138.357c-8.328 8.328-18.384 12.492-30.17 12.492s-21.842-4.164-30.17-12.492c-8.328-8.328-12.492-18.384-12.492-30.169s4.164-21.841 12.492-30.169l211.19-211.19c8.328-8.328 18.384-12.492 30.169-12.492s21.841 4.164 30.169 12.492z"
	  }), vdom("path", {
	    className: "path2",
	    d: "M653.556 967.119l-211.189-211.189c-8.328-8.328-12.492-18.385-12.492-30.171 0-11.784 4.164-21.841 12.492-30.169s18.385-12.492 30.171-12.492c11.785 0 21.841 4.164 30.169 12.492l138.357 138.357-0.236-379.245c0-11.943 4.164-22.077 12.492-30.405s18.424-12.453 30.288-12.375 21.96 4.283 30.288 12.611c8.013 8.013 12.256 18.071 12.728 30.169l-0.236 379.245 138.357-138.357c8.328-8.328 18.385-12.492 30.171-12.492 11.784 0 21.841 4.164 30.169 12.492s12.492 18.384 12.492 30.169c0 11.785-4.164 21.843-12.492 30.171l-211.189 211.189c-8.328 8.328-18.385 12.492-30.169 12.492s-21.843-4.164-30.171-12.492z"
	  }));
	};

	icons.iconLock = function() {
	  return vdom("svg", {
	    className: "icon icon-lock",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M512 42.667q69.667 0 128.5 34.333t93.167 93.167 34.333 128.5v170.667h85.333q53 0 90.5 37.5t37.5 90.5v256q0 53-37.5 90.5t-90.5 37.5h-682.667q-53 0-90.5-37.5t-37.5-90.5v-256q0-53 37.5-90.5t90.5-37.5h85.333v-170.667q0-69.667 34.333-128.5t93.167-93.167 128.5-34.333zM853.333 554.667h-682.667q-17.667 0-30.167 12.5t-12.5 30.167v256q0 17.667 12.5 30.167t30.167 12.5h682.667q17.667 0 30.167-12.5t12.5-30.167v-256q0-17.667-12.5-30.167t-30.167-12.5zM512 128q-70.667 0-120.667 50t-50 120.667v170.667h341.333v-170.667q0-70.667-50-120.667t-120.667-50z"
	  }));
	};

	icons.iconGoOut = function() {
	  return vdom("svg", {
	    className: "icon icon-out",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M512 44.667q18 0 30.333 12.333l213.333 213.333q12.333 12.333 12.333 30.333 0 18.333-12.167 30.5t-30.5 12.167q-18 0-30.333-12.333l-140.333-140.667v494.333q0 17.667-12.5 30.167t-30.167 12.5-30.167-12.5-12.5-30.167v-494.333l-140.333 140.667q-13 12.333-30.333 12.333-17.667 0-30.167-12.5t-12.5-30.167q0-17.333 12.333-30.333l213.333-213.333q12.333-12.333 30.333-12.333zM938.667 642q17.667 0 30.167 12.5t12.5 30.167v170.667q0 53.333-37 90.333-37.667 37.667-90 37.667h-683.667q-52.333 0-90.667-37.333-37.333-38.333-37.333-90.667v-170.667q0-17.667 12.5-30.167t30.167-12.5 30.167 12.5 12.5 30.167v170.667q0 17.667 12.5 30.167t30.167 12.5h683.667q17.333 0 29.5-12.5t12.167-30.167v-170.667q0-17.667 12.5-30.167t30.167-12.5z"
	  }));
	};

	icons.iconCloudUpload = function() {
	  return vdom("svg", {
	    className: "icon icon-cloud",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M640 85.333q78 0 149.167 30.5t122.5 81.833 81.833 122.5 30.5 149.167q0 72.667-26.5 139.667t-72 117.333-108.667 83.5-134.167 41.167v-86q71.667-10.333 130.167-51.833t92.167-105.667 33.667-138.167q0-60.667-23.667-116t-63.667-95.333-95.333-63.667-116-23.667q-55.333 0-106.5 19.833t-90 53.833-65 81.333-33.833 101h-88.667q-70.667 0-120.667 50t-50 120.667q0 38.667 15.167 71.667t39.833 54.167 54.833 33 60.833 11.833h170.667v85.333h-170.667q-69.667 0-128.5-34.333t-93.167-93.167-34.333-128.5 34.333-128.5 93.167-93.167 128.5-34.333h22q26.333-74.333 79.333-132.167t126.833-90.833 155.833-33zM554.667 426.667q17.667 0 30.333 12.667l128 128q12.333 12.333 12.333 30 0 18.333-12.167 30.5t-30.5 12.167q-18 0-30.333-12.333l-55-55.333v281q0 17.667-12.5 30.167t-30.167 12.5-30.167-12.5-12.5-30.167v-281l-55 55.333q-12.333 12.333-30.333 12.333-17.667 0-30.167-12.5t-12.5-30.167q0-17 12.333-30l128-128q12.667-12.667 30.333-12.667z"
	  }));
	};

	icons.iconReload = function() {
	  return vdom("svg", {
	    className: "icon icon-reload",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M42.667 554.667h256q17.667 0 30.167 12.5t12.5 30.167-12.5 30.167-30.167 12.5h-144l116 113.333q49.333 49.667 113 75 61 25 128.333 25t128.333-25q33.333-13.667 62.5-33.5t49.667-40.667 37.333-44.667 27-43.833 17.167-40q6-16.667 22-24.167t32.333-1.833q16.667 6 24.167 21.833t1.833 32.167q-14 42.667-40.667 84.667t-60 75.333q-61.333 61.333-141 93.667-77.333 31.333-160.667 31.333-83 0-160.667-31.333-79.667-32.333-141-93.667l-125-122.333v162q0 17.667-12.5 30.167t-30.167 12.5-30.167-12.5-12.5-30.167v-256q0-17.667 12.5-30.167t30.167-12.5zM512 85.333q83 0 160.667 31.333 79.667 32.333 141 93.667l0.667 0.667 124.333 121.667v-162q0-17.667 12.5-30.167t30.167-12.5 30.167 12.5 12.5 30.167v256q0 17.667-12.5 30.167t-30.167 12.5h-256q-17.667 0-30.167-12.5t-12.5-30.167 12.5-30.167 30.167-12.5h144l-116-113.333q-48.667-48.667-110.833-74.333t-130.5-25.667q-67.333 0-128.333 25-63.667 25.333-113 75-20 17.667-43.833 53.833t-36.833 73.833q-6 16.667-22 24.167t-32.333 1.833q-16.667-6-24.167-21.833t-1.833-32.167q14-42.667 40.667-84.667t60-75.333q61.333-61.333 141-93.667 77.667-31.333 160.667-31.333z"
	  }));
	};

	icons.iconArchive = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M298.667 42.667h426.667q53 0 90.5 37.5t37.5 90.5v810.667l-341.333-256-341.333 256v-810.667q0-53 37.5-90.5t90.5-37.5zM725.333 128h-426.667q-17.667 0-30.167 12.5t-12.5 30.167v640l256-192 256 192v-640q0-17.667-12.5-30.167t-30.167-12.5z"
	  }));
	};

	icons.iconSort = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M128 213.333h768q17.667 0 30.167 12.5t12.5 30.167-12.5 30.167-30.167 12.5h-768q-17.667 0-30.167-12.5t-12.5-30.167 12.5-30.167 30.167-12.5zM128 725.333h768q17.667 0 30.167 12.5t12.5 30.167-12.5 30.167-30.167 12.5h-768q-17.667 0-30.167-12.5t-12.5-30.167 12.5-30.167 30.167-12.5zM128 469.333h768q17.667 0 30.167 12.5t12.5 30.167-12.5 30.167-30.167 12.5h-768q-17.667 0-30.167-12.5t-12.5-30.167 12.5-30.167 30.167-12.5z"
	  }));
	};

	icons.iconParagraph = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M426.667 42.667h384q17.667 0 30.167 12.5t12.5 30.167v853.333q0 17.667-12.5 30.167t-30.167 12.5-30.167-12.5-12.5-30.167v-810.667h-85.333v810.667q0 17.667-12.5 30.167t-30.167 12.5-30.167-12.5-12.5-30.167v-384h-170.667q-69.667 0-128.5-34.333t-93.167-93.167-34.333-128.5 34.333-128.5 93.167-93.167 128.5-34.333zM597.333 469.333v-341.333h-170.667q-70.667 0-120.667 50t-50 120.667 50 120.667 120.667 50h170.667z"
	  }));
	};

	icons.iconNew = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M512 85.333q17.667 0 30.167 12.5t12.5 30.167v341.333h341.333q17.667 0 30.167 12.5t12.5 30.167-12.5 30.167-30.167 12.5h-341.333v341.333q0 17.667-12.5 30.167t-30.167 12.5-30.167-12.5-12.5-30.167v-341.333h-341.333q-17.667 0-30.167-12.5t-12.5-30.167 12.5-30.167 30.167-12.5h341.333v-341.333q0-17.667 12.5-30.167t30.167-12.5z"
	  }));
	};

	icons.iconEnter = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M356.667 869q17.333 0 30-12.5t12.667-30.167-12.667-30.333l-198.667-198.667h409.333q78 0 149.167-30.333t122.5-81.833 81.833-122.5 30.5-149.333v-42.667q0-17.667-12.5-30.167t-30.167-12.5q-17.333 0-30 12.667t-12.667 30v42.667q0 60.667-23.667 116t-63.667 95.333-95.333 63.667-116 23.667h-409.333l198.667-199q12.667-12.667 12.667-30 0-17.667-12.5-30.333t-30.167-12.667-30.333 12.667l-271.333 271.667q-12.333 12.333-12.333 30.333 0 17.667 12.333 30l271.333 271.667q12.667 12.667 30.333 12.667z"
	  }));
	};

	icons.iconEdit = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M180.224 90.624c-35.328 0-65.435 12.56-90.437 37.563s-37.563 55.109-37.563 90.437v618.688c0 35.328 12.56 65.498 37.563 90.5s55.11 37.5 90.437 37.5h618.688c35.328 0 65.498-12.498 90.5-37.5s37.5-55.172 37.5-90.5v-387.875l-85.25 77.625v310.313c0 11.776-4.22 21.783-12.562 30.125s-18.349 12.562-30.125 12.562h-618.688c-11.776 0-21.846-4.22-30.188-12.562s-12.5-18.349-12.5-30.125v-307.188l-3.188-3.5 3.188-2.875v-305.125c0-11.776 4.159-21.846 12.5-30.188s18.412-12.5 30.188-12.5h339.188l93.75-85.375h-433z"
	  }), vdom("path", {
	    className: "path2",
	    d: "M913.758 98.93l37.351 41.013c23.787 26.119 28.389 49.736 26.739 85.056s-15.533 64.875-41.652 88.663l-410.068 373.481c-26.119 23.788-45.423 34.518-91.981 40.343s-123.547 7.753-148.363-19.094c-24.815-26.847-20.018-82.397-12.616-131.23s30.034-82.319 56.153-106.108l410.068-373.481c26.119-23.788 56.838-34.858 92.159-33.209s58.422 8.448 82.21 34.566zM895.143 190.959l-37.351-41.013c-7.929-8.706-17.797-13.346-29.58-13.896s-22.028 3.139-30.735 11.069l-417.176 379.955c-8.706 7.929-27.073 26.789-27.624 38.573-10.006 49.155-15.414 71.972-3.821 85.344s47.002 8.62 84.927 2.747c17.978-4.213 32.667-14.584 41.373-22.513l417.176-379.955c8.706-7.929 13.335-17.785 13.885-29.57s-3.145-22.034-11.074-30.741z"
	  }));
	};

	icons.iconTrash = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M426.667 42.667h170.667q53 0 90.5 37.5t37.5 90.5v42.667h170.667q17.667 0 30.167 12.5t12.5 30.167-12.5 30.167-30.167 12.5h-42.667v512q0 53-37.5 90.5t-90.5 37.5h-426.667q-53 0-90.5-37.5t-37.5-90.5v-512h-42.667q-17.667 0-30.167-12.5t-12.5-30.167 12.5-30.167 30.167-12.5h170.667v-42.667q0-53 37.5-90.5t90.5-37.5zM768 810.667v-512h-512v512q0 17.667 12.5 30.167t30.167 12.5h426.667q17.667 0 30.167-12.5t12.5-30.167zM597.333 128h-170.667q-17.667 0-30.167 12.5t-12.5 30.167v42.667h256v-42.667q0-17.667-12.5-30.167t-30.167-12.5z"
	  }));
	};

	icons.iconEye = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M512 128q69.667 0 135.5 21.167t115.5 55 93.5 74.833 73.667 82 51.667 74.833 32.167 54.833l10 21.333q-2.333 5-6.333 13.5t-18.833 34.667-31.667 51.667-44.333 60-56.833 64.333-69.5 60.167-82.333 51.5-94.833 34.667-107.333 13.5q-69.667 0-135.5-21.167t-115.5-54.833-93.5-74.333-73.667-81.5-51.667-74.5-32.167-55l-10-21q2.333-5 6.333-13.5t18.833-34.833 31.667-51.833 44.333-60.333 56.833-64.667 69.5-60.333 82.333-51.833 94.833-34.833 107.333-13.5zM512 213.333q-46.667 0-91.667 12.333t-81.167 31.833-70.667 47.167-59.667 54.5-48.833 57.667-37.667 52.833-26.333 44q12.333 21.667 26.333 43.5t37.667 52.333 48.833 57 59.667 53.833 70.667 46.667 81.167 31.5 91.667 12.167 91.667-12.333 81.167-31.667 70.667-46.833 59.667-54.167 48.833-57.333 37.667-52.667 26.333-43.667q-12.333-21.667-26.333-43.667t-37.667-52.667-48.833-57.333-59.667-54.167-70.667-46.833-81.167-31.667-91.667-12.333zM512 341.333q70.667 0 120.667 50t50 120.667-50 120.667-120.667 50-120.667-50-50-120.667 50-120.667 120.667-50zM512 426.667q-35.333 0-60.333 25t-25 60.333 25 60.333 60.333 25 60.333-25 25-60.333-25-60.333-60.333-25z"
	  }));
	};

	icons.iconMenu = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M853.333 384q53 0 90.5 37.5t37.5 90.5-37.5 90.5-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5zM170.667 384q53 0 90.5 37.5t37.5 90.5-37.5 90.5-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5zM170.667 469.333q-17.667 0-30.167 12.5t-12.5 30.167 12.5 30.167 30.167 12.5 30.167-12.5 12.5-30.167-12.5-30.167-30.167-12.5zM512 384q53 0 90.5 37.5t37.5 90.5-37.5 90.5-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5zM512 469.333q-17.667 0-30.167 12.5t-12.5 30.167 12.5 30.167 30.167 12.5 30.167-12.5 12.5-30.167-12.5-30.167-30.167-12.5zM853.333 469.333q-17.667 0-30.167 12.5t-12.5 30.167 12.5 30.167 30.167 12.5 30.167-12.5 12.5-30.167-12.5-30.167-30.167-12.5z"
	  }));
	};

	icons.iconDownload = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M640 170.667h170.667q53 0 90.5 37.5t37.5 90.5v597.333q0 53-37.5 90.5t-90.5 37.5h-597.333q-53 0-90.5-37.5t-37.5-90.5v-597.333q0-53 37.5-90.5t90.5-37.5h170.667v85.333h-170.667q-17.667 0-30.167 12.5t-12.5 30.167v597.333q0 17.667 12.5 30.167t30.167 12.5h597.333q17.667 0 30.167-12.5t12.5-30.167v-597.333q0-17.667-12.5-30.167t-30.167-12.5h-170.667v-85.333zM512 0q17.667 0 30.167 12.5t12.5 30.167v537l97.667-98q12.333-12.333 30.333-12.333 18.333 0 30.5 12.167t12.167 30.5q0 18-12.333 30.333l-170.667 170.667q-12.333 12.333-30.333 12.333t-30.333-12.333l-170.667-170.667q-12.333-13-12.333-30.333 0-17.667 12.5-30.167t30.167-12.5q18 0 30.333 12.333l97.667 98v-537q0-17.667 12.5-30.167t30.167-12.5z"
	  }));
	};

	icons.iconStarFilled = function() {
	  return vdom("svg", {
	    className: "icon icon-star-filled",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M396.667 384l115.333-355 115.333 355h373.333l-302 209.667 115.333 348.667-302-221-302 219.333 115.333-347-302-209.667h373.333z"
	  }));
	};

	icons.iconStar = function() {
	  return vdom("svg", {
	    className: "icon icon-star",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M396.667 384l115.333-355 115.333 355h373.333l-302 209.667 115.333 348.667-302-221-302 219.333 115.333-347-302-209.667h373.333zM565.333 469.333l-53.333-169.667-53.333 169.667h-165.667l133.333 88.333-52.333 157.667 138.333-100 137.667 101-52.333-157.667 133-89.333h-165.333z"
	  }));
	};

	icons.iconMap = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M682.667 213.333l341.333-213.333v810.667l-341.333 213.333-341.333-213.333-341.333 213.333v-810.667l341.333-213.333zM298.667 736.667v-609l-213.333 133.333v609zM640 287.333l-256-160.333v609.667l256 160v-609.333zM938.667 763.333v-609.333l-213.333 133.333v609.333z"
	  }));
	};

	icons.iconConfig = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M512 0q53 0 90.5 37.5t37.5 90.5v22q15.667 5.333 37.667 15.333l15.333-15.333q37.667-37.667 90.667-37.667 52.667 0 90.333 37.667t37.667 90.333q0 53-37.667 90.667l-15.333 15.333q10 22 15.333 37.667h22q53 0 90.5 37.5t37.5 90.5-37.5 90.5-90.5 37.5h-22q-5.333 15.667-15.333 37.667l15.333 15.333q37.667 37.667 37.667 90.667 0 52.667-37.667 90.333t-90.333 37.667q-53 0-90.667-37.667l-15.333-15.333q-22 10-37.667 15.333v22q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5v-22q-15.667-5.333-37.667-15.333l-15.333 15.333q-37.667 37.667-90.333 37.667-53 0-90.5-37.667t-37.5-90.333q0-53.333 37.333-90.667l15.333-15.333q-10-22-15.333-37.667h-22q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5h22q5.333-15.667 15.333-37.667l-15.333-15.333q-37.333-37.333-37.333-90.667 0-52.667 37.5-90.333t90.5-37.667q52.667 0 90.333 37.667l15.333 15.333q22-10 37.667-15.333v-22q0-53 37.5-90.5t90.5-37.5zM512 85.333q-17.667 0-30.167 12.5t-12.5 30.167v88.333q-74.667 10.667-136.333 56.333l-62.333-62.333q-12.667-12.667-30-12.667-17.667 0-30.167 12.5t-12.5 30.167q0 18 12.333 30.333l62.333 62.333q-45.667 61.667-56.333 136.333h-88.333q-17.667 0-30.167 12.5t-12.5 30.167 12.5 30.167 30.167 12.5h88.333q10.667 74.667 56.333 136.333l-62.333 62.333q-12.333 12.333-12.333 30.333 0 17.667 12.5 30.167t30.167 12.5q17.333 0 30-12.667l62.333-62.333q61.667 45.667 136.333 56.333v88.333q0 17.667 12.5 30.167t30.167 12.5 30.167-12.5 12.5-30.167v-88.333q74.667-10.667 136.333-56.333l62.333 62.333q12.667 12.667 30.333 12.667t30.167-12.5 12.5-30.167-12.667-30.333l-62.333-62.333q45.667-61.667 56.333-136.333h88.333q17.667 0 30.167-12.5t12.5-30.167-12.5-30.167-30.167-12.5h-88.333q-10.667-74.667-56.333-136.333l62.333-62.333q12.667-12.667 12.667-30.333t-12.5-30.167-30.167-12.5-30.333 12.667l-62.333 62.333q-61.667-45.667-136.333-56.333v-88.333q0-17.667-12.5-30.167t-30.167-12.5zM512 341.333q70.667 0 120.667 50t50 120.667-50 120.667-120.667 50-120.667-50-50-120.667 50-120.667 120.667-50zM512 426.667q-35.333 0-60.333 25t-25 60.333 25 60.333 60.333 25 60.333-25 25-60.333-25-60.333-60.333-25z"
	  }));
	};

	icons.iconInbox = function() {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M256 128h512l256 256v384q0 53-37.5 90.5t-90.5 37.5h-768q-53 0-90.5-37.5t-37.5-90.5v-384zM938.667 768v-298.667h-187.333q-28.333 74-94.5 122.333t-144.833 48.333q-52.333 0-101.667-22.333t-86-61.167-55-87.167h-184v298.667q0 17.333 12.333 30t30.333 12.667h768q17.667 0 30.167-12.5t12.5-30.167zM903.333 384l-169-170.667h-443l-170.667 170.667h220.667q0 42.333 22.667 81.667t62.5 64.167 85.5 24.833 85.5-24.833 62.5-64.167 22.667-81.667h220.667z"
	  }));
	};

	icons.filledTriangle = function(angle) {
	  return vdom("svg", {
	    className: "icon",
	    viewBox: "0 0 1024 1024"
	  }, vdom("path", {
	    className: "path1",
	    d: "M170.667 896v-768l640 384-640 384z",
	    transform: "rotate(" + angle + ",512,512)"
	  }));
	};

	module.exports.icons = icons;
	

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// modified from https://github.com/es-shims/es6-shim
	var keys = __webpack_require__(1);
	var canBeObject = function (obj) {
		return typeof obj !== 'undefined' && obj !== null;
	};
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
	var defineProperties = __webpack_require__(17);
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	var isEnumerableOn = function (obj) {
		return function isEnumerable(prop) {
			return propIsEnumerable.call(obj, prop);
		};
	};

	var assignShim = function assign(target, source1) {
		if (!canBeObject(target)) { throw new TypeError('target must be an object'); }
		var objTarget = Object(target);
		var s, source, i, props;
		for (s = 1; s < arguments.length; ++s) {
			source = Object(arguments[s]);
			props = keys(source);
			if (hasSymbols && Object.getOwnPropertySymbols) {
				props.push.apply(props, Object.getOwnPropertySymbols(source).filter(isEnumerableOn(source)));
			}
			for (i = 0; i < props.length; ++i) {
				objTarget[props[i]] = source[props[i]];
			}
		}
		return objTarget;
	};

	assignShim.shim = function shimObjectAssign() {
		if (Object.assign && Object.preventExtensions) {
			var assignHasPendingExceptions = (function () {
				// Firefox 37 still has "pending exception" logic in its Object.assign implementation,
				// which is 72% slower than our shim, and Firefox 40's native implementation.
				var thrower = Object.preventExtensions({ 1: 2 });
				try {
					Object.assign(thrower, 'xy');
				} catch (e) {
					return thrower[1] === 'y';
				}
			}());
			if (assignHasPendingExceptions) {
				delete Object.assign;
			}
		}
		if (!Object.assign) {
			defineProperties(Object, {
				assign: assignShim
			});
		}
		return Object.assign || assignShim;
	};

	module.exports = assignShim;



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var AddItemButtonGroup, AddItemToInboxButtonGroup, ConfigButtonGroup, EditButtonGroup, MenuBar, React, _me, fn1, fn2, h, icons, rdomid, ss, topItemId,
	  slice = [].slice,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	_me = module.exports;

	React = __webpack_require__(16);

	icons = __webpack_require__(4).icons;

	rdomid = function(idname) {
	  return document.getElementById(idname);
	};

	fn1 = function(keyNumber, func) {
	  return function(e) {
	    if (e.keyCode === keyNumber) {
	      if (e.preventDefault) {
	        e.preventDefault();
	      }
	      console.log("pressed");
	      return func(e);
	    }
	  };
	};

	fn2 = function() {
	  var funcs;
	  funcs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	  return (function(_this) {
	    return function(e) {
	      var func, i, len;
	      for (i = 0, len = funcs.length; i < len; i++) {
	        func = funcs[i];
	        func(e);
	      }
	    };
	  })(this);
	};

	ss = function() {
	  return React.createElement("span", {
	    style: {
	      width: "6px"
	    }
	  });
	};

	h = __webpack_require__(3).h;

	topItemId = "testnode3";

	AddItemButtonGroup = (function(superClass) {
	  extend(AddItemButtonGroup, superClass);

	  function AddItemButtonGroup(props) {
	    this.onClose = bind(this.onClose, this);
	    this.onEnter = bind(this.onEnter, this);
	    this.onFocus = bind(this.onFocus, this);
	    this.onClick = bind(this.onClick, this);
	    this.componentWillUnmount = bind(this.componentWillUnmount, this);
	    this.componentDidMount = bind(this.componentDidMount, this);
	    AddItemButtonGroup.__super__.constructor.call(this, props);
	    this.displayName = "AddItemButton";
	    this.state = {
	      isEditing: this.props.isEditing
	    };
	  }

	  AddItemButtonGroup.prototype.componentDidMount = function() {
	    if (React.findDOMNode(this.refs.newItemInput) != null) {
	      React.findDOMNode(this.refs.newItemInput).addEventListener('keydown', fn1(13, this.onEnter));
	      return React.findDOMNode(this.refs.newItemInput).addEventListener('keydown', fn1(27, this.onClick));
	    }
	  };

	  AddItemButtonGroup.prototype.componentWillUnmount = function() {
	    if (React.findDOMNode(this.refs.newItemInput) != null) {
	      React.findDOMNode(this.refs.newItemInput).removeEventListener('keydown', fn1(13, this.onEnter));
	      return React.findDOMNode(this.refs.newItemInput).removeEventListener('keydown', fn1(27, this.onClick));
	    }
	  };

	  AddItemButtonGroup.prototype.onClick = function(e) {
	    var state, target;
	    target = React.findDOMNode(this.refs.newItemInput);
	    state = this.state.isEditing ? true : false;
	    target.blur();
	    this.setState({
	      isEditing: !state
	    }, function() {
	      if (this.state.isEditing) {
	        return target.focus();
	      } else {
	        return target.value = "";
	      }
	    });
	  };

	  AddItemButtonGroup.prototype.onFocus = function(e) {
	    var elem, l;
	    elem = e.target;
	    l = elem.value.length;
	    elem.selectionStart = l;
	    elem.selectionEnd = l;
	    return null;
	  };

	  AddItemButtonGroup.prototype.onEnter = function(e) {
	    var target;
	    e.preventDefault();
	    target = React.findDOMNode(this.refs.newItemInput);
	    this.props.onNewItemAdded(target.value);
	    target.value = "";
	    this.setState({
	      isEditing: false
	    });
	  };

	  AddItemButtonGroup.prototype.onClose = function(e) {
	    var target;
	    e.preventDefault();
	    target = React.findDOMNode(this.refs.newItemInput);
	    if (e.target === target) {
	      return;
	    }
	    target.blur();
	    return this.setState({
	      isEditing: false
	    });
	  };

	  AddItemButtonGroup.prototype.render = function() {
	    var s1, s2;
	    s1 = this.state.isEditing ? {
	      display: "block"
	    } : {
	      display: "none"
	    };
	    s2 = {};
	    return React.createElement("div", null, React.createElement("button", {
	      "onClick": this.onClick
	    }, icons.iconNew()), React.createElement("div", {
	      "className": "row eight columns offset-by-two button-group",
	      "style": s1
	    }, React.createElement("div", null, React.createElement("div", null, "Add item to: ", this.props.inputTarget)), React.createElement("div", {
	      "className": "menu-row"
	    }, React.createElement("input", {
	      "className": "",
	      "type": "text",
	      "defaultValue": "",
	      "onFocus": this.onFocus,
	      "ref": "newItemInput",
	      "style": {
	        width: "100%"
	      }
	    }), React.createElement("button", {
	      "onClick": this.onEnter,
	      "onTouchStart": this.onEnter
	    }, icons.iconEnter()), React.createElement("div", null))));
	  };

	  return AddItemButtonGroup;

	})(React.Component);

	_me.AddItemButtonGroup = AddItemButtonGroup;

	AddItemToInboxButtonGroup = (function(superClass) {
	  extend(AddItemToInboxButtonGroup, superClass);

	  function AddItemToInboxButtonGroup() {
	    return AddItemToInboxButtonGroup.__super__.constructor.apply(this, arguments);
	  }

	  AddItemToInboxButtonGroup.prototype.render = function() {
	    var s1, s2;
	    s1 = this.state.isEditing ? {
	      display: "block"
	    } : {
	      display: "none"
	    };
	    s2 = {};
	    return React.createElement("div", null, React.createElement("button", {
	      "onClick": this.onClick
	    }, icons.iconInbox()), React.createElement("div", {
	      "className": "row eight columns offset-by-two button-group",
	      "style": s1
	    }, React.createElement("div", null, React.createElement("div", null, "Add item to: INBOX")), React.createElement("div", {
	      "className": "menu-row"
	    }, React.createElement("input", {
	      "className": "",
	      "type": "text",
	      "defaultValue": "",
	      "onFocus": this.onFocus,
	      "ref": "newItemInput",
	      "style": {
	        width: "100%"
	      }
	    }), React.createElement("button", {
	      "onClick": this.onEnter,
	      "onTouchStart": this.onEnter
	    }, icons.iconEnter()), React.createElement("div", null))));
	  };

	  return AddItemToInboxButtonGroup;

	})(AddItemButtonGroup);

	EditButtonGroup = (function(superClass) {
	  extend(EditButtonGroup, superClass);

	  function EditButtonGroup(props) {
	    this.onClose = bind(this.onClose, this);
	    this.onOpenClose = bind(this.onOpenClose, this);
	    EditButtonGroup.__super__.constructor.call(this, props);
	    this.displayName = "EditButtonGroup";
	    this.state = {
	      isEditing: this.props.isEditing
	    };
	  }

	  EditButtonGroup.prototype.onOpenClose = function(e) {
	    return this.setState({
	      isEditing: !this.state.isEditing
	    }, function() {});
	  };

	  EditButtonGroup.prototype.onClose = function(e) {
	    return this.setState({
	      isEditing: false
	    });
	  };

	  EditButtonGroup.prototype.render = function() {
	    var s1, s2;
	    s1 = this.state.isEditing ? {
	      display: "block",
	      position: "absolute",
	      left: "50%"
	    } : {
	      display: "none"
	    };
	    s2 = {};
	    return React.createElement("div", null, React.createElement("button", {
	      "onClick": this.onOpenClose,
	      "ref": "button1"
	    }, icons.iconMenu()), React.createElement("div", {
	      "className": "row ",
	      "style": s1
	    }, React.createElement("div", {
	      "className": "menu-second-row",
	      "style": {
	        position: "relative",
	        left: "-50%"
	      }
	    }, React.createElement("button", {
	      "onClick": fn2(this.props.onStartEditing, this.onClose)
	    }, icons.iconEdit()), React.createElement("button", {
	      "onClick": fn2(this.props.onStartEditingAll, this.onClose)
	    }, icons.iconParagraph()), ss(), React.createElement("button", {
	      "onClick": fn2(this.props.onStartSorting, this.onClose)
	    }, icons.iconSort()), React.createElement("button", {
	      "onClick": fn2(this.props.onDeleted, this.onClose)
	    }, icons.iconTrash()), ss(), React.createElement("button", {
	      "onClick": fn2(this.props.onArchived, this.onClose)
	    }, icons.iconArchive()))));
	  };

	  return EditButtonGroup;

	})(React.Component);

	_me.EditButtonGroup = EditButtonGroup;

	ConfigButtonGroup = (function(superClass) {
	  extend(ConfigButtonGroup, superClass);

	  function ConfigButtonGroup(props) {
	    this.onClose = bind(this.onClose, this);
	    this.onOpenClose = bind(this.onOpenClose, this);
	    ConfigButtonGroup.__super__.constructor.call(this, props);
	    this.displayName = "ConfigButtonGroup";
	    this.state = {
	      isEditing: this.props.isEditing
	    };
	    console.log(this.props.cnfg);
	  }

	  ConfigButtonGroup.prototype.onOpenClose = function(e) {
	    return this.setState({
	      isEditing: !this.state.isEditing
	    }, function() {});
	  };

	  ConfigButtonGroup.prototype.onClose = function(e) {
	    return this.setState({
	      isEditing: false
	    });
	  };

	  ConfigButtonGroup.prototype.render = function() {
	    var s1, s2;
	    s1 = this.state.isEditing ? {
	      display: "block",
	      position: "absolute",
	      left: "50%"
	    } : {
	      display: "none"
	    };
	    s2 = {};
	    return React.createElement("div", null, React.createElement("button", {
	      "onClick": this.onOpenClose,
	      "ref": "button1"
	    }, icons.iconConfig()), React.createElement("div", {
	      "className": "row ",
	      "style": s1
	    }, React.createElement("div", {
	      "className": "menu-second-row",
	      "style": {
	        position: "relative",
	        left: "-50%"
	      }
	    }, React.createElement("button", {
	      "id": "signin-button"
	    }, icons.iconLock()), ss(), React.createElement("button", {
	      "onClick": fn2(this.props.onLoadData, this.onClose)
	    }, icons.iconDownload()), ss(), React.createElement("button", {
	      "className": (this.props.cnfg.showInactive ? "inactive-highlight" : ""),
	      "onClick": fn2(this.props.onEyeIconClicked, this.onClose)
	    }, icons.iconEye()))));
	  };

	  return ConfigButtonGroup;

	})(React.Component);

	_me.ConfigButtonGroup = ConfigButtonGroup;

	MenuBar = (function(superClass) {
	  extend(MenuBar, superClass);

	  MenuBar.defaultProps = {
	    onNewItemAdded: React.PropTypes.func.isRequired,
	    onSaveData: React.PropTypes.func.isRequired,
	    onLoadData: React.PropTypes.func.isRequired
	  };

	  function MenuBar(props) {
	    this.onNewItemAddedToInbox = bind(this.onNewItemAddedToInbox, this);
	    this.onNewItemAdded = bind(this.onNewItemAdded, this);
	    this.displayName = "MenuBar";
	    this.state = {
	      isOpenArray: [false, false]
	    };
	  }

	  MenuBar.prototype.onNewItemAdded = function(val) {
	    return this.props.onNewItemAdded(val);
	  };

	  MenuBar.prototype.onNewItemAddedToInbox = function(val) {
	    return this.props.onNewItemAddedToInbox(val);
	  };

	  MenuBar.prototype.render = function() {
	    return React.createElement("div", {
	      "className": "u-full-width menu-row"
	    }, React.createElement(AddItemButtonGroup, {
	      "onNewItemAdded": this.onNewItemAdded,
	      "inputTarget": this.props.inputTarget,
	      "isEditing": this.state.isOpenArray[1],
	      "onSecondRowOpen": this.closeOtherMenus
	    }), React.createElement(AddItemToInboxButtonGroup, {
	      "onNewItemAdded": this.onNewItemAddedToInbox,
	      "inputTarget": this.props.inputTarget,
	      "isEditing": this.state.isOpenArray[1],
	      "onSecondRowOpen": this.closeOtherMenus
	    }), (this.props.mapShow ? React.createElement("button", {
	      "onClick": this.props.onOpenMapToJump
	    }, icons.iconMap()) : void 0), React.createElement("button", {
	      "onClick": this.props.onSaveData
	    }, icons.iconCloudUpload()), ss(), React.createElement(EditButtonGroup, {
	      "onStartEditing": this.props.onStartEditing,
	      "onStartEditingAll": this.props.onStartEditingAll,
	      "onStartSorting": this.props.onStartSorting,
	      "onArchived": this.props.onArchived,
	      "onDeleted": this.props.onDeleted,
	      "isEditing": this.state.isOpenArray[0],
	      "onSecondRowOpen": this.closeOtherMenus
	    }), ss(), React.createElement(ConfigButtonGroup, {
	      "cnfg": this.props.cnfg,
	      "onLoadData": this.props.onLoadData,
	      "onEyeIconClicked": this.props.onEyeIconClicked,
	      "isEditing": this.state.isOpenArray[0],
	      "onSecondRowOpen": this.closeOtherMenus
	    }));
	  };

	  return MenuBar;

	})(React.Component);

	_me.MenuBar = MenuBar;
	

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Archive, ModalItemEditor, ModalWindow, React, TagComponent, _me, fn1, fn2, h, icons, p, rdomid, ss, update, vdom,
	  slice = [].slice,
	  hasProp = {}.hasOwnProperty;

	_me = module.exports;

	React = __webpack_require__(16);

	icons = __webpack_require__(4).icons;

	update = React.addons.update;

	rdomid = function(idname) {
	  return document.getElementById(idname);
	};

	vdom = React.createElement;

	h = __webpack_require__(3).h;

	p = __webpack_require__(3).p;

	Archive = __webpack_require__(3).Archive;

	fn1 = function(keyNumber, func) {
	  return function(e) {
	    if (e.keyCode === keyNumber) {
	      if (e.preventDefault) {
	        e.preventDefault();
	      }
	      console.log("pressed");
	      return func(e);
	    }
	  };
	};

	fn2 = function() {
	  var funcs;
	  funcs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	  return (function(_this) {
	    return function(e) {
	      var func, i, len;
	      for (i = 0, len = funcs.length; i < len; i++) {
	        func = funcs[i];
	        func(e);
	      }
	    };
	  })(this);
	};

	ss = function() {
	  return React.createElement("span", {
	    style: {
	      width: "4px"
	    }
	  });
	};

	TagComponent = __webpack_require__(9).TagComponent;

	ModalWindow = React.createClass({
	  displayName: 'ModalWindow',
	  killClick: function(e) {
	    e.stopPropagation();
	  },
	  getDefaultProps: function() {
	    return {
	      shown: false,
	      okShown: true,
	      koShown: true
	    };
	  },
	  handleCancelClick: function() {
	    this.props.onRequestClose();
	  },
	  handleSaveClick: function() {
	    this.props.onRequestSaveAndClose();
	  },
	  render: function() {
	    console.log(!this.props.shown);
	    return vdom('div', {
	      className: 'ModalBackdrop u-full-width',
	      onClick: this.handleCancelClick,
	      style: {
	        display: !this.props.shown ? "none" : "inline"
	      }
	    }, vdom('div', {
	      className: 'ModalContent eight columns offset-by-two',
	      onClick: this.killClick
	    }, this.props.children, vdom("div", {
	      className: "row"
	    }, this.props.koShown ? vdom("button", {
	      onClick: this.handleCancelClick
	    }, "Cancel") : void 0, this.props.okShown ? vdom("button", {
	      onClick: this.handleSaveClick
	    }, "save") : void 0)));
	  }
	});

	module.exports.ModalWindow = ModalWindow;

	ModalItemEditor = React.createClass({
	  displayName: 'ModalItemEditor',
	  getInitialState: function() {
	    return {
	      data: this.props.data,
	      datastr: this.props.data.serialize()
	    };
	  },
	  componentDidMount: function() {
	    if (React.findDOMNode(this.refs.editModalTextarea) != null) {
	      return React.findDOMNode(this.refs.editModalTextarea).addEventListener('keydown', (function(e) {
	        var elem, end, start, value;
	        if (e.keyCode === 9) {
	          if (e.preventDefault) {
	            e.preventDefault();
	          }
	          elem = e.target;
	          start = elem.selectionStart;
	          end = elem.selectionEnd;
	          value = elem.value;
	          elem.value = (value.substring(0, start)) + "\t" + (value.substring(end));
	          return elem.selectionStart = elem.selectionEnd = start + 1;
	        }
	      }));
	    }
	  },
	  onChange: function(e) {
	    var _key;
	    _key = e.target.dataset.key;
	    this.state.data.tags[_key] = e.target.value;
	    return this.setState({
	      data: this.state.data
	    });
	  },
	  deleteTag: function(key) {
	    delete this.state.data.tags[key];
	    return this.setState({
	      data: this.state.data
	    });
	  },
	  strModified: function(e) {
	    var _c, _t, i, len, line, lines, out1, out2, out3, ref;
	    lines = React.findDOMNode(this.refs.editModalTextarea).value.split("\n");
	    _t = p.convertLineToItem(lines[0]);
	    _c = [];
	    ref = lines.slice(1);
	    for (i = 0, len = ref.length; i < len; i++) {
	      line = ref[i];
	      if (!(line === "")) {
	        _c.push(line);
	      }
	    }
	    _t.comments.addComments(_c);
	    out1 = update(this.state.data, {
	      name: {
	        $set: _t.name
	      }
	    });
	    out2 = update(out1, {
	      tags: {
	        $set: _t.tags
	      }
	    });
	    out3 = update(out2, {
	      comments: {
	        $set: _t.comments
	      }
	    });
	    return out3;
	  },
	  render: function() {
	    var k, v;
	    return vdom(ModalWindow, {
	      shown: this.props.shown,
	      onRequestClose: (function(_this) {
	        return function(e) {
	          _this.props.onCancel();
	          return null;
	        };
	      })(this),
	      onRequestSaveAndClose: (function(_this) {
	        return function(e) {
	          _this.props.onSave(_this.strModified(e));
	          return null;
	        };
	      })(this)
	    }, vdom("div", {
	      className: "row"
	    }, vdom("span", null, "title: " + this.state.data.name), vdom("div", {
	      className: "u-full-width"
	    }, (function() {
	      var ref, results;
	      ref = this.state.data.tags;
	      results = [];
	      for (k in ref) {
	        if (!hasProp.call(ref, k)) continue;
	        v = ref[k];
	        results.push(vdom(TagComponent, {
	          tag: {
	            key: k,
	            val: v
	          },
	          tagDeleted: this.deleteTag
	        }));
	      }
	      return results;
	    }).call(this))), vdom("div", {
	      className: "row"
	    }, vdom('textarea', {
	      className: "u-full-width",
	      ref: "editModalTextarea",
	      type: "text",
	      defaultValue: this.props.data.serialize(),
	      style: {
	        height: "15em"
	      }
	    }), vdom("div", {
	      className: "u-full-width",
	      style: {
	        display: "none"
	      }
	    }, JSON.stringify(this.props.data))));
	  }
	});

	_me.ModalItemEditor = ModalItemEditor;
	

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var ItemPane, ProjectPaneComponent, React, SignalComponent, SmartFolderPaneComponent, _me, fn1, fn2, h, icons, rdomid, ss, update, vdom,
	  slice = [].slice;

	_me = module.exports;

	React = __webpack_require__(16);

	update = React.addons.update;

	vdom = React.createElement;

	icons = __webpack_require__(4).icons;

	rdomid = function(idname) {
	  return document.getElementById(idname);
	};

	fn1 = function(keyNumber, func) {
	  return function(e) {
	    if (e.keyCode === keyNumber) {
	      if (e.preventDefault) {
	        e.preventDefault();
	      }
	      console.log("pressed");
	      return func(e);
	    }
	  };
	};

	fn2 = function() {
	  var funcs;
	  funcs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	  return (function(_this) {
	    return function(e) {
	      var func, j, len;
	      for (j = 0, len = funcs.length; j < len; j++) {
	        func = funcs[j];
	        func(e);
	      }
	    };
	  })(this);
	};

	ss = function() {
	  return React.createElement("span", {
	    style: {
	      width: "4px"
	    }
	  });
	};

	h = __webpack_require__(3).h;

	ProjectPaneComponent = __webpack_require__(9).ProjectPaneComponent;

	SignalComponent = __webpack_require__(9).SignalComponent;

	SmartFolderPaneComponent = __webpack_require__(9).SmartFolderPaneComponent;

	ItemPane = React.createClass({
	  displayName: "ItemPane",
	  propTypes: {
	    ItemList: React.PropTypes.any.isRequired,
	    config: React.PropTypes.any.isRequired
	  },
	  getInitialState: function() {
	    return {
	      config: {
	        selectedPos: null,
	        smartFoldersFolding: false,
	        foldersFolding: false
	      }
	    };
	  },
	  allowDrop: function(e) {
	    e.preventDefault();
	    return this.over = e.target;
	  },
	  dragEnd: function(e) {
	    return this.props.dropHandler(e, this.over);
	  },
	  handleSelectionChanged: function(val, id) {
	    this.props.onFolderOpenFromPane(id);
	    return null;
	  },
	  onClickOnRoot: function(e) {
	    return this.props.onFolderOpenFromPane(null);
	  },
	  onSmartFolderClicked: function(id) {
	    console.log(id);
	    return this.props.onSmartFolderClicked(+id + 1);
	  },
	  render: function() {
	    var __t, _f, archiveItemId, focus, i, item;
	    __t = this.props.ItemList.filter(function(ele) {
	      return ele.name === "Archive";
	    })[0];
	    if (__t != null) {
	      archiveItemId = __t.id;
	    } else {
	      archiveItemId = "";
	    }
	    _f = this.props.config.focusLists[0];
	    return vdom("div", {
	      className: "u-full-width"
	    }, vdom("div", {}, vdom("SPAN", {
	      style: {
	        fontWeight: "600",
	        fontSize: "large"
	      },
	      onClick: (function(_this) {
	        return function() {
	          console.log(_this.state.config.smartFoldersFolding);
	          return _this.setState({
	            config: update(_this.state.config, {
	              smartFoldersFolding: {
	                $set: !_this.state.config.smartFoldersFolding
	              }
	            })
	          });
	        };
	      })(this)
	    }, this.state.config.smartFoldersFolding ? icons.filledTriangle(0) : icons.filledTriangle(90), "SMART FOLDERS: "), !this.state.config.smartFoldersFolding ? vdom("ul", null, (function() {
	      var j, len, ref, results;
	      ref = this.props.config.focusLists.slice(1);
	      results = [];
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        focus = ref[i];
	        results.push(vdom(SmartFolderPaneComponent, {
	          key: i,
	          isSelected: focus.isActive,
	          "data-id": i,
	          data: {
	            name: focus.name
	          },
	          selectionChanged: this.onSmartFolderClicked,
	          childzStyle: {
	            marginLeft: "-0.5rem",
	            display: "block"
	          }
	        }));
	      }
	      return results;
	    }).call(this)) : void 0), vdom("div", {}, vdom("SPAN", {
	      style: {
	        fontWeight: "600",
	        fontSize: "large"
	      },
	      onClick: (function(_this) {
	        return function() {
	          console.log(_this.state.config.smartFoldersFolding);
	          return _this.setState({
	            config: update(_this.state.config, {
	              foldersFolding: {
	                $set: !_this.state.config.foldersFolding
	              }
	            })
	          });
	        };
	      })(this)
	    }, this.state.config.foldersFolding ? icons.filledTriangle(0) : icons.filledTriangle(90), "FOLDERS: "), !this.state.config.foldersFolding ? vdom("ul", null, vdom(ProjectPaneComponent, {
	      isSelected: _f.isActive && _f.projectId === null,
	      data: {
	        name: "ROOT"
	      },
	      selectionChanged: this.onClickOnRoot,
	      childzStyle: {
	        marginLeft: "-0.5rem",
	        display: "block"
	      }
	    }), (function() {
	      var j, len, ref, results;
	      ref = this.props.ItemList;
	      results = [];
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        item = ref[i];
	        if (item.isDir && item.parentId !== archiveItemId) {
	          results.push(vdom(ProjectPaneComponent, {
	            isSelected: _f.isActive && h.itemPosInArray(_f.projectId, this.props.ItemList) === i,
	            data: item,
	            key: item.id,
	            dropHandler: this.dragEnd,
	            dragOverHandler: this.allowDrop,
	            selectionChanged: this.handleSelectionChanged,
	            childzStyle: {
	              marginLeft: (h.itemDepth(item, this.props.ItemList) * 0.5 - 0.5) + "rem",
	              display: (h.isWithTag(item, "waiting") || h.isWithTag(item, "someday") || h.isAncestorWithTag(item, "waiting", this.props.ItemList) || h.isAncestorWithTag(item, "someday", this.props.ItemList)) && !this.props.config.showInactive ? "none" : "block"
	            }
	          }, item.name !== "Archive" ? vdom(SignalComponent, {
	            arr: h.returnChildItems(this.props.ItemList, item.id),
	            IL: this.props.ItemList
	          }) : void 0));
	        }
	      }
	      return results;
	    }).call(this)) : void 0));
	  }
	});

	_me.ItemPane = ItemPane;
	

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Archive, FolderTagComponent, ProjectComponent, ProjectPaneComponent, React, SignalComponent, SmartFolderPaneComponent, TagComponent, TaskComponent, createRdom, h, helper, icons, mergeObj, myRegEx, p, plurals, rdomid, te, update, vdom,
	  slice = [].slice,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	React = __webpack_require__(16);

	update = React.addons.update;

	h = __webpack_require__(3).h;

	p = __webpack_require__(3).p;

	Archive = __webpack_require__(3).Archive;

	te = __webpack_require__(15).te;

	icons = __webpack_require__(4).icons;

	mergeObj = function() {
	  var tap, xs;
	  xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	  tap = function(o, fn) {
	    fn(o);
	    return o;
	  };
	  if ((xs != null ? xs.length : void 0) > 0) {
	    return tap({}, function(m) {
	      var j, k, len, results, v, x;
	      results = [];
	      for (j = 0, len = xs.length; j < len; j++) {
	        x = xs[j];
	        results.push((function() {
	          var results1;
	          results1 = [];
	          for (k in x) {
	            v = x[k];
	            results1.push(m[k] = v);
	          }
	          return results1;
	        })());
	      }
	      return results;
	    });
	  }
	};

	rdomid = function(idname) {
	  return document.getElementById(idname);
	};

	createRdom = function(target, elementName) {
	  return target.createElement(elementName);
	};

	myRegEx = {
	  repeatPhrase: /(now|n|d|due|)\+?(\d+)(days|day|d|weeks|week|wks|wk|w|months|month|mons|mon|m|)/
	};

	plurals = {
	  day: ["days", "day", "d"],
	  week: ["weeks", "week", "wks", "wk", "w"],
	  month: ["months", "month", "mons", "mon", "m"]
	};

	vdom = React.createElement;

	React.initializeTouchEvents(true);

	helper = {};

	helper.isElementMatchTagAndClass = function(ele, _tagArr, _classArr) {
	  var _className, _tagName, j, l, len, len1;
	  if ((ele.className != null) && (typeof ele.className === "string") && (ele.tagName != null)) {
	    for (j = 0, len = _tagArr.length; j < len; j++) {
	      _tagName = _tagArr[j];
	      for (l = 0, len1 = _classArr.length; l < len1; l++) {
	        _className = _classArr[l];
	        if ((ele.className.indexOf(_className) !== -1) && ele.tagName === _tagName) {
	          return true;
	        }
	      }
	    }
	  }
	  return false;
	};

	helper.returnNthParent = function(ele, n) {
	  if (n === 0) {
	    return ele;
	  }
	  return helper.returnNthParent(ele.parentNode, n - 1);
	};

	helper.returnItemInParent = function(el) {
	  var _t, j, len, n, ref;
	  ref = [0, 1, 2, 3, 4, 5];
	  for (j = 0, len = ref.length; j < len; j++) {
	    n = ref[j];
	    _t = null;
	    _t = helper.returnNthParent(el, n);
	    if (helper.isElementMatchTagAndClass(_t, ["LI", "li"], ["task", "project"])) {
	      return _t;
	    }
	  }
	  return null;
	};

	SignalComponent = (function(superClass) {
	  extend(SignalComponent, superClass);

	  function SignalComponent(props) {
	    SignalComponent.__super__.constructor.call(this, props);
	  }

	  SignalComponent.prototype.arrayIfHighPriority = function() {
	    return this.props.arr.filter(function(item) {
	      return !item.isDir;
	    }).map((function(_this) {
	      return function(item) {
	        if (h.isWithTag(item, ["high", "star", "!!!"]) || h.isAncestorWithTag(item, ["high", "star", "!!!"], _this.props.IL)) {
	          return "high";
	        } else {
	          return false;
	        }
	      };
	    })(this));
	  };

	  SignalComponent.prototype.arrayOfDueColor = function() {
	    return this.props.arr.filter(function(item) {
	      return !item.isDir;
	    }).map(function(item) {
	      switch (false) {
	        case !h.isDueInRange(item, null, -1):
	          return "overdue";
	        case !h.isDueInRange(item, -1, 0):
	          return "today";
	        case !h.isDueInRange(item, 0, 1):
	          return "tomorrow";
	        case !h.isDueInRange(item, 1, 7):
	          return "inweek";
	        default:
	          return false;
	      }
	    });
	  };

	  SignalComponent.prototype.arrayOfAll = function() {
	    var a, arr1, arr2, i, item, j, len, ret;
	    ret = [];
	    arr1 = this.arrayIfHighPriority();
	    arr2 = this.arrayOfDueColor();
	    for (i = j = 0, len = arr1.length; j < len; i = ++j) {
	      item = arr1[i];
	      a = [];
	      if (item) {
	        a.push(item);
	      }
	      if (arr2[i]) {
	        a.push(arr2[i]);
	      }
	      ret.push(a);
	    }
	    return ret;
	  };

	  SignalComponent.prototype.render = function() {
	    return vdom("span", {
	      className: "signals"
	    }, this.arrayOfAll().map(function(item, ind) {
	      if (item.length === 2) {
	        return icons.iconOneCircle2Part(item[0], item[1], ind);
	      } else if (item.length === 1) {
	        return icons.iconOneCircle(item[0], ind);
	      } else {
	        return icons.iconOneCircle("none", ind);
	      }
	    }));
	  };

	  return SignalComponent;

	})(React.Component);

	TagComponent = React.createClass({
	  displayName: "TagComponent",
	  _onclick: function(e) {
	    console.log("event");
	    return this.props.tagDeleted(this.props.tag.key);
	  },
	  additionalTag: function() {
	    var _diff, ref;
	    if (this.props.tag.key === "due") {
	      _diff = h.diffDueAndToday(this.props.tag.val);
	      switch (false) {
	        case !(_diff <= -1):
	          return "icon-overdue";
	        case !(_diff > -1 && _diff <= 0):
	          return "icon-today";
	        case !(_diff > 0 && _diff <= 1):
	          return "icon-tomorrow";
	        case !(_diff > 1 && _diff <= 7):
	          return "icon-inweek";
	      }
	    } else if ((ref = this.props.tag.key) === "high" || ref === "star" || ref === "!!!") {
	      return "icon-high";
	    } else {
	      return "";
	    }
	  },
	  render: function() {
	    var s1;
	    s1 = this.props.tag.val === "" ? {
	      className: "tag"
	    } : {
	      className: "tag",
	      title: this.props.tag.val
	    };
	    return vdom("li", s1, vdom("i", null, icons.iconTag()), vdom("span", {
	      className: "tag " + (this.additionalTag())
	    }, this.props.tag.key), this.props.tagDeleted != null ? vdom("i", {
	      className: "tag-delete",
	      onClick: this._onclick
	    }, icons.iconCancelCircle()) : vdom("span", {
	      style: {
	        width: "12px"
	      }
	    }));
	  }
	});

	FolderTagComponent = React.createClass({
	  displayName: "FolderTagComponent",
	  render: function() {
	    return vdom("li", {
	      className: "tag"
	    }, vdom("i", null, icons.iconFolderOpen("icon-folder-tag")), vdom("span", {
	      className: "tag"
	    }, this.props.tag.val));
	  }
	});

	TaskComponent = (function(superClass) {
	  extend(TaskComponent, superClass);

	  function TaskComponent(props) {
	    this.handleStarClick = bind(this.handleStarClick, this);
	    this.swipeHandler = bind(this.swipeHandler, this);
	    this.handleClick = bind(this.handleClick, this);
	    this._tagDeleted = bind(this._tagDeleted, this);
	    this._onclick = bind(this._onclick, this);
	    TaskComponent.__super__.constructor.call(this, props);
	    this.state = {
	      selected: false,
	      isReadyMove: false,
	      isTouching: false
	    };
	  }

	  TaskComponent.prototype._onclick = function(e) {
	    e.stopPropagation();
	    return this.props.changeChecked(!h.isWithTag(this.props.data, "done"), this.props.data.id);
	  };

	  TaskComponent.prototype._tagDeleted = function(tagkey) {
	    return this.props.tagDeleted(tagkey, this.props.data.id);
	  };

	  TaskComponent.prototype.handleClick = function(e) {
	    e.stopPropagation();
	    this.props.selectionChanged(this.props.data.isSelected, this.props.data.id);
	    return null;
	  };

	  TaskComponent.prototype.swipeHandler = function(e, elem) {
	    var isElementMatchTagAndClass, returnItemInParent, returnNthParent;
	    isElementMatchTagAndClass = function(ele, _tagArr, _classArr) {
	      var _className, _tagName, j, l, len, len1;
	      if ((ele.className != null) && (typeof ele.className === "string") && (ele.tagName != null)) {
	        for (j = 0, len = _tagArr.length; j < len; j++) {
	          _tagName = _tagArr[j];
	          for (l = 0, len1 = _classArr.length; l < len1; l++) {
	            _className = _classArr[l];
	            if ((ele.className.indexOf(_className) !== -1) && ele.tagName === _tagName) {
	              return true;
	            }
	          }
	        }
	      }
	      return false;
	    };
	    returnNthParent = function(ele, n) {
	      if (n === 0) {
	        return ele;
	      }
	      return returnNthParent(ele.parentNode, n - 1);
	    };
	    returnItemInParent = function(el) {
	      var _t, j, len, n, ref;
	      ref = [0, 1, 2, 3, 4, 5];
	      for (j = 0, len = ref.length; j < len; j++) {
	        n = ref[j];
	        _t = null;
	        _t = returnNthParent(el, n);
	        if (isElementMatchTagAndClass(_t, ["LI", "li"], ["task", "project"])) {
	          return _t;
	        }
	      }
	      return null;
	    };
	    this.setState({
	      isReadyMove: false
	    });
	    console.log(returnItemInParent(elem));
	    if (returnItemInParent(elem).dataset != null) {
	      this.props.onSwipeFinished(this.props.data.id, returnItemInParent(elem).dataset.id);
	    }
	  };

	  TaskComponent.prototype.handleStarClick = function(e) {
	    e.stopPropagation();
	    return this.props.onStarClick(this.props.data.id, !h.isWithTag(this.props.data, "high"));
	  };

	  TaskComponent.prototype.render = function() {
	    var ij, k, sty1, sty2, v;
	    sty1 = this.props.data.isSelected ? {
	      className: "task selected"
	    } : {
	      className: "task"
	    };
	    sty2 = this.state.isTouching ? {
	      backgroundColor: "Red"
	    } : {};
	    ij = 0;
	    return vdom("li", {
	      className: this.props.data.isSelected ? "task selected" : "task",
	      style: mergeObj(this.props.childzStyle, sty2),
	      draggable: true,
	      onDrop: (function(_this) {
	        return function(e) {
	          _this.props.dropHandler(e);
	          return null;
	        };
	      })(this),
	      onDragOver: ((function(_this) {
	        return function(e) {
	          _this.props.dragOverHandler(e);
	          return null;
	        };
	      })(this)),
	      onDragStart: ((function(_this) {
	        return function(e) {
	          _this.props.dragStartHandler(e);
	          return null;
	        };
	      })(this)),
	      "data-id": this.props.data.id,
	      "id": this.props.data.id,
	      onDoubleClick: ((function(_this) {
	        return function(e) {
	          _this.props.onDblClick(_this.props.data.id);
	          return null;
	        };
	      })(this)),
	      onClick: this.handleClick
	    }, vdom("i", {
	      className: "task checkbox",
	      onClick: this._onclick
	    }, (h.isWithTag(this.props.data, "done") ? icons.iconSquareCheck() : icons.iconSquare())), vdom("i", {
	      className: "task star",
	      onClick: this.handleStarClick
	    }, (h.isWithTag(this.props.data, ["high", "star", "!!!"]) || h.includeTag(this.props.ancestorTagsObj, ["high", "star", "!!!"]) ? icons.iconStarFilled() : icons.iconStar())), vdom("span", mergeObj(sty1, {}), this.props.data.name), vdom("ul", {
	      className: "tags"
	    }, (function() {
	      var ref, results;
	      ref = this.props.data.tags;
	      results = [];
	      for (k in ref) {
	        if (!hasProp.call(ref, k)) continue;
	        v = ref[k];
	        ij = ij + 1;
	        if (k !== "done") {
	          results.push(vdom(TagComponent, {
	            tag: {
	              key: k,
	              val: v
	            },
	            tagDeleted: this._tagDeleted,
	            key: ij
	          }, null));
	        } else {
	          results.push(void 0);
	        }
	      }
	      return results;
	    }).call(this), (function() {
	      var ref, results;
	      ref = this.props.ancestorTagsObj;
	      results = [];
	      for (k in ref) {
	        if (!hasProp.call(ref, k)) continue;
	        v = ref[k];
	        ij = ij + 1;
	        if (k !== "done") {
	          results.push(vdom(TagComponent, {
	            tag: {
	              key: k,
	              val: v
	            },
	            key: ij
	          }, null));
	        } else {
	          results.push(void 0);
	        }
	      }
	      return results;
	    }).call(this), (function() {
	      var ref, results;
	      ref = this.props.folderTag;
	      results = [];
	      for (k in ref) {
	        if (!hasProp.call(ref, k)) continue;
	        v = ref[k];
	        ij = ij + 1;
	        if (k !== "done") {
	          if (k === "prj") {
	            results.push(vdom(FolderTagComponent, {
	              tag: {
	                key: k,
	                val: v
	              },
	              tagDeleted: this._tagDeleted,
	              key: ij
	            }, null));
	          } else {
	            results.push(vdom(TagComponent, {
	              tag: {
	                key: k,
	                val: v
	              },
	              key: ij
	            }, null));
	          }
	        } else {
	          results.push(void 0);
	        }
	      }
	      return results;
	    }).call(this)), vdom("i", {
	      onClick: this.clickComment,
	      title: this.props.data.comments.join("\n")
	    }, icons.iconComment(this.props.data.comments)));
	  };

	  return TaskComponent;

	})(React.Component);

	ProjectComponent = (function(superClass) {
	  extend(ProjectComponent, superClass);

	  function ProjectComponent() {
	    return ProjectComponent.__super__.constructor.apply(this, arguments);
	  }

	  ProjectComponent.prototype._onclickFolder = function(e) {
	    return null;
	  };

	  ProjectComponent.prototype.render = function() {
	    var ij, k, sty1, sty2, v;
	    ij = 0;
	    sty1 = this.props.data.isSelected ? {
	      className: "project selected"
	    } : {
	      className: "project"
	    };
	    sty2 = this.state.isTouching ? {
	      backgroundColor: "Red"
	    } : {};
	    return vdom("li", {
	      className: this.props.data.isSelected ? "project selected" : "project",
	      style: mergeObj(this.props.childzStyle, sty2),
	      draggable: true,
	      onDrop: (function(_this) {
	        return function(e) {
	          _this.props.dropHandler(e);
	          return null;
	        };
	      })(this),
	      onDragOver: ((function(_this) {
	        return function(e) {
	          _this.props.dragOverHandler(e);
	          return null;
	        };
	      })(this)),
	      onDragStart: ((function(_this) {
	        return function(e) {
	          _this.props.dragStartHandler(e);
	          return null;
	        };
	      })(this)),
	      "data-id": this.props.data.id,
	      "id": this.props.data.id,
	      onDoubleClick: ((function(_this) {
	        return function(e) {
	          _this.props.onDblClick(_this.props.data.id);
	          return null;
	        };
	      })(this)),
	      onClick: this.handleClick
	    }, vdom("i", {
	      className: "project folder",
	      onClick: ((function(_this) {
	        return function(e) {
	          e.stopPropagation();
	          _this.props.folderToggled(_this.props.data.isFolding, _this.props.data.id);
	          return null;
	        };
	      })(this))
	    }, this.props.data.isFolding ? icons.iconFolder() : icons.iconFolderOpen()), vdom("span", mergeObj(sty1, {}), this.props.data.name), this.props.children, vdom("ul", {
	      className: "tags"
	    }, (function() {
	      var ref, results;
	      ref = this.props.data.tags;
	      results = [];
	      for (k in ref) {
	        if (!hasProp.call(ref, k)) continue;
	        v = ref[k];
	        ij = ij + 1;
	        if (k !== "done") {
	          results.push(vdom(TagComponent, {
	            tag: {
	              key: k,
	              val: v
	            },
	            tagDeleted: this._tagDeleted,
	            key: ij
	          }, null));
	        } else {
	          results.push(void 0);
	        }
	      }
	      return results;
	    }).call(this)), vdom("i", {
	      onClick: this.clickComment,
	      title: this.props.data.comments.join("\n")
	    }, icons.iconComment(this.props.data.comments)));
	  };

	  return ProjectComponent;

	})(TaskComponent);

	ProjectPaneComponent = (function(superClass) {
	  extend(ProjectPaneComponent, superClass);

	  function ProjectPaneComponent(props) {
	    ProjectPaneComponent.__super__.constructor.call(this, props);
	  }

	  ProjectPaneComponent.prototype.render = function() {
	    var sty1;
	    sty1 = this.props.isSelected ? {
	      className: "project selected"
	    } : {
	      className: "project"
	    };
	    return vdom("li", {
	      className: (this.props.isSelected ? "project selected side-pane" : "project side-pane"),
	      style: this.props.childzStyle,
	      onClick: this.handleClick,
	      onDrop: (function(_this) {
	        return function(e) {
	          _this.props.dropHandler(e);
	          return null;
	        };
	      })(this),
	      onDragOver: ((function(_this) {
	        return function(e) {
	          _this.props.dragOverHandler(e);
	          return null;
	        };
	      })(this)),
	      onDragStart: ((function(_this) {
	        return function(e) {
	          _this.props.dragStartHandler(e);
	          return null;
	        };
	      })(this)),
	      "data-id": this.props.data.id
	    }, vdom("span", null, this.props.data.name), this.props.children);
	  };

	  return ProjectPaneComponent;

	})(ProjectComponent);

	SmartFolderPaneComponent = (function(superClass) {
	  extend(SmartFolderPaneComponent, superClass);

	  function SmartFolderPaneComponent(props) {
	    this.handleClick = bind(this.handleClick, this);
	    SmartFolderPaneComponent.__super__.constructor.call(this, props);
	  }

	  SmartFolderPaneComponent.prototype.handleClick = function(e) {
	    if (e.target.dataset.id != null) {
	      return this.props.selectionChanged(e.target.dataset.id);
	    } else {
	      return this.props.selectionChanged(e.target.parentNode.dataset.id);
	    }
	  };

	  SmartFolderPaneComponent.prototype.render = function() {
	    var sty1;
	    sty1 = this.props.isSelected ? {
	      className: "project selected"
	    } : {
	      className: "project"
	    };
	    return vdom("li", {
	      className: (this.props.isSelected ? "project selected side-pane" : "project side-pane"),
	      style: this.props.childzStyle,
	      onClick: this.handleClick,
	      onDrop: (function(_this) {
	        return function(e) {
	          _this.props.dropHandler(e);
	          return null;
	        };
	      })(this),
	      onDragOver: ((function(_this) {
	        return function(e) {
	          _this.props.dragOverHandler(e);
	          return null;
	        };
	      })(this)),
	      onDragStart: ((function(_this) {
	        return function(e) {
	          _this.props.dragStartHandler(e);
	          return null;
	        };
	      })(this)),
	      "data-id": this.props["data-id"]
	    }, vdom("span", null, this.props.data.name), this.props.children);
	  };

	  return SmartFolderPaneComponent;

	})(ProjectPaneComponent);

	module.exports.SignalComponent = SignalComponent;

	module.exports.TagComponent = TagComponent;

	module.exports.TaskComponent = TaskComponent;

	module.exports.ProjectComponent = ProjectComponent;

	module.exports.ProjectPaneComponent = ProjectPaneComponent;

	module.exports.SmartFolderPaneComponent = SmartFolderPaneComponent;
	

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./app.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./app.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(31)();
	exports.i(__webpack_require__(29), "");
	exports.i(__webpack_require__(30), "");
	exports.push([module.id, "\n\n* {\n  -webkit-tap-highlight-color: rgba(0,0,0,0);\n  -webkit-touch-callout: none;\n}\n*:not(input):not(textarea) {\n  -webkit-user-select: none;\n}\n.icon {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  margin-top: 0.2rem;\n  fill: currentColor;\n  position: relative;\n  vertical-align: middle;\n  z-index: -1;\n}\nsvg.icon {\n  vertical-align: middle;\n}\n.icon-star {\n  margin-left: 3px;\n  width: 27px;\n  height: 27px;\n  fill: #ccc;\n}\n.icon-star-filled {\n  margin-left: 3px;\n  width: 27px;\n  height: 27px;\n  fill: #ffe049;\n}\n.icon-dot {\n  width: 1rem;\n  height: 1rem;\n  margin-left: -0.1em;\n}\n.icon-check {\n  width: 30px;\n  height: 30px;\n  fill: #ccc;\n  vertical-align: middle;\n}\n.icon-checked .path1 {\n  fill: #000;\n}\n.icon-comment {\n  fill: #808080;\n  z-index: 2;\n}\n.icon-tag {\n  width: 0.5em;\n  height: 0.5em;\n  fill: #008000;\n}\n.icon-folder-tag {\n  width: 0.7em;\n  height: 0.7em;\n  margin-bot: 1;\n  fill: #00f;\n}\n.icon-cancel-circle {\n  width: 0.6em;\n  height: 0.6em;\n  fill: rgba(0,0,0,0);\n  z-index: 2;\n}\n.icon-cancel-circle:hover {\n  fill: #808080;\n}\ni.tag-delete {\n  position: relative;\n  z-index: 2;\n}\ni.tag-delete:hover {\n  fill: #808080;\n}\n.icon-folder,\n.icon-folder-open {\n  fill: #00f;\n  vertical-align: middle;\n  width: 26px;\n  height: 26px;\n}\n.icon-today {\n  fill: Coral;\n  background-color: Coral;\n}\n.icon-high {\n  fill: #ffe049;\n  background-color: #ffe049;\n}\n.icon-overdue {\n  fill: Crimson;\n  background-color: Crimson;\n}\n.icon-inweek {\n  fill: #c2f0ff;\n  background-color: #c2f0ff;\n}\n.icon-tomorrow {\n  fill: #0cf;\n  background-color: #0cf;\n}\n.icon-none {\n  fill: Gainsboro;\n  background-color: Gainsboro;\n}\nli.task .touch-active,\nli.project .touch-active {\n  fill: #cff;\n  background-color: #cff;\n}\n.icon-solid-circle {\n  width: 0.7em;\n  height: 0.7em;\n}\n.toggle {\n  display: inline;\n  float: right;\n  margin-right: 0.3em;\n}\nh1:first-child {\n  margin-top: 2rem;\n}\nul {\n  padding-left: 2px;\n}\nul.tags {\n  margin: 0;\n  padding: 0;\n  margin-left: 0.2em;\n  display: inline-block;\n  _display: inline;\n  font-style: italic;\n}\nul.side-pane {\n  padding-left: 0rem;\n  overflow-y: scroll;\n}\ndiv.task.inactive {\n  border-bottom-style: solid;\n  border-right-style: solid;\n  border-width: thin;\n  border-color: Gainsboro;\n  background-color: #f0f0f0;\n  z-index: -1;\n  overflow: hidden;\n  -webkit-border-radius: 0em 0em 0.3em 0em;\n  border-radius: 0em 0em 0.3em 0em;\n  -webkit-border-radius: 0em 0em 0.3em 0em;\n  -moz-border-radius: 0em 0em 0.3em 0em;\n}\ndiv.task.inactive:hover,\ndiv.task.inactive:focus {\n  background-color: rgba(204,255,255,0.25);\n}\nli.task,\nli.project {\n  border-bottom-style: solid;\n  border-right-style: solid;\n  border-width: thin;\n  border-color: Gainsboro;\n  font-size: large;\n  list-style: none;\n  height: 38px;\n  z-index: -1;\n  overflow: hidden;\n  padding-left: 10px;\n  -webkit-border-radius: 0em 0em 0.3em 0em;\n  border-radius: 0em 0em 0.3em 0em;\n  -webkit-border-radius: 0em 0em 0.3em 0em;\n  -moz-border-radius: 0em 0em 0.3em 0em;\n}\nli.task:hover,\nli.project:hover,\nli.task:focus,\nli.project:focus {\n  background-color: rgba(204,255,255,0.25);\n}\nli.task:hover .icon-check,\nli.project:hover .icon-check,\nli.task:focus .icon-check,\nli.project:focus .icon-check {\n  fill: #808080;\n}\nli.task.selected,\nli.project.selected {\n  border-left-style: solid;\n  border-left-width: 7px;\n  border-left-color: LightSeaGreen;\n  padding-left: 3px;\n}\nli.task.side-pane,\nli.project.side-pane {\n  height: 34px;\n  padding-left: 10px;\n  border-top-style: solid;\n  border-right-style: none;\n  border-bottom-style: none;\n  border-left-style: solid;\n}\nli.task.side-pane.selected,\nli.project.side-pane.selected {\n  border-left-width: 6px;\n  padding-left: 5px;\n}\nbutton:hover {\n  background-color: rgba(204,255,255,0.5);\n}\ninput[type=\"text\"] {\n  font-size: large;\n}\nli.tag {\n  margin-left: 0.2em;\n  display: inline-block;\n  _display: inline;\n  list-style: none;\n  vertical-align: middle;\n}\nli.tag:first-child {\n  margin-left: 0.3em;\n}\nbutton {\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  -webkit-border-radius: 10px;\n  -moz-border-radius: 10px;\n}\nspan {\n  vertical-align: middle;\n}\nspan.task,\nspan.project {\n  margin-left: 0.3em;\n}\nspan.tag {\n  font-size: small;\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  -webkit-border-radius: 10px;\n  -moz-border-radius: 10px;\n  margin-right: 0.2em;\n}\nspan.signals {\n  vertical-align: middle;\n  margin-left: 0.4em;\n}\n.item-title {\n  height: 20pt;\n}\ntextarea {\n  height: 20em;\n  resize: vertical;\n}\ni.task,\ni.project {\n  position: relative;\n  z-index: 2;\n}\ni.folder {\n  margin-left: 3px;\n  margin-right: 2px;\n}\ntextarea,\npre {\n  -moz-tab-size: 3;\n  -o-tab-size: 3;\n  -moz-tab-size: 3;\n  -o-tab-size: 3;\n  tab-size: 3;\n  font-size: large;\n}\n.shake.shake-constant.shake-little-slow {\n  -webkit-animation-name: shake-little;\n  -ms-animation-name: shake-little;\n  -webkit-animation-name: shake-little;\n  -moz-animation-name: shake-little;\n  -o-animation-name: shake-little;\n  -ms-animation-name: shake-little;\n  animation-name: shake-little;\n  -webkit-animation-duration: 2s;\n  -ms-animation-duration: 2s;\n  -webkit-animation-duration: 2s;\n  -moz-animation-duration: 2s;\n  -o-animation-duration: 2s;\n  -ms-animation-duration: 2s;\n  animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n  -ms-animation-iteration-count: infinite;\n  -webkit-animation-iteration-count: infinite;\n  -moz-animation-iteration-count: infinite;\n  -o-animation-iteration-count: infinite;\n  -ms-animation-iteration-count: infinite;\n  animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n  -ms-animation-timing-function: ease-in-out;\n  -webkit-animation-timing-function: ease-in-out;\n  -moz-animation-timing-function: ease-in-out;\n  -o-animation-timing-function: ease-in-out;\n  -ms-animation-timing-function: ease-in-out;\n  animation-timing-function: ease-in-out;\n  -webkit-animation-delay: 0s;\n  -ms-animation-delay: 0s;\n  -webkit-animation-delay: 0s;\n  -moz-animation-delay: 0s;\n  -o-animation-delay: 0s;\n  -ms-animation-delay: 0s;\n  animation-delay: 0s;\n  -webkit-animation-play-state: running;\n  -ms-animation-play-state: running;\n  -webkit-animation-play-state: running;\n  -moz-animation-play-state: running;\n  -o-animation-play-state: running;\n  -ms-animation-play-state: running;\n  animation-play-state: running;\n}\nhtml,\nbody {\n  height: 100%;\n}\n.ModalBackdrop {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  fill: rgba(0,0,0,0.5);\n  background-color: rgba(0,0,0,0.5);\n  z-index: 5;\n}\n.ModalContent {\n  position: relative;\n  background: #fff;\n  margin-top: 25px;\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  -webkit-border-radius: 10px;\n  -moz-border-radius: 10px;\n  padding: 10px;\n  z-index: 10;\n}\ndiv.button-group {\n  position: absolute;\n  background-color: #f4ffff;\n  padding: 8px;\n  z-index: 4;\n  left: 0;\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  -webkit-border-radius: 10px;\n  -moz-border-radius: 10px;\n}\ndiv.floating-menu {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  background-color: #f4ffff;\n  margin-bot: 10px;\n  padding: 8px;\n  z-index: 4;\n}\ndiv.floating-menu button {\n  background-color: rgba(0,0,0,0);\n}\ndiv.menu-row {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: box;\n  display: flex;\n  -webkit-box-pack: center;\n  -moz-box-pack: center;\n  -o-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n}\ndiv.menu-second-row {\n  background-color: #f4ffff;\n  padding: 8px;\n  z-index: 4;\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  -webkit-border-radius: 10px;\n  -moz-border-radius: 10px;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: box;\n  display: flex;\n  -webkit-box-pack: center;\n  -moz-box-pack: center;\n  -o-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n}\nbutton.inactive-highlight svg {\n  fill: Coral;\n}\ndiv.container {\n  padding-top: 40px;\n}\ni:hover,\nli.tag:hover {\n  position: relative;\n}\ni[title]:hover:after,\nli.tag:hover:after {\n  display: block;\n  content: attr(title);\n  font-size: medium;\n  font-weight: bold;\n  font-color: #00f;\n  padding: 1px 4px;\n  color: #333;\n  position: absolute;\n  left: 0;\n  top: 0%;\n  white-space: nowrap;\n  z-index: 20;\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  border-style: none;\n  background-color: rgba(255,255,255,0.8);\n  overflow: visible;\n}\n.no-scrollbar {\n/* These rules create an artificially confined space, so we get \n     a scrollbar that we can hide. They are not part of the hiding itself. */\n  border: 1px solid #f0f0f0;\n  padding: 5px;\n  -webkit-border-radius: 4px;\n  border-radius: 4px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  white-space: pre-wrap;\n  overflow-y: scroll;\n}\n.no-scrollbar::-webkit-scrollbar {\n/* This is the magic bit */\n  display: none;\n}\n", ""]);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, Buffer) {/*!
	 * @license deepcopy.js Copyright(c) 2013 sasa+1
	 * https://github.com/sasaplus1/deepcopy.js
	 * Released under the MIT license.
	 */


	/**
	 * export to AMD/CommonJS/global.
	 *
	 * @param {Object} global global object.
	 * @param {Function} factory factory method.
	 */
	(function(global, factory) {
	  'use strict';

	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory();
	  } else {
	    global.deepcopy = factory();
	  }
	}(this, function() {
	  'use strict';

	  var isNode, util, isBuffer, getKeys, getSymbols, indexOfArray;

	  // is node.js/io.js?
	  isNode = (typeof process !== 'undefined' && "function" !== 'undefined');

	  // fallback util module for browser.
	  util = (isNode) ? __webpack_require__(20) : (function() {
	    function isArray(value) {
	      return (typeof value === 'object' &&
	          Object.prototype.toString.call(value) === '[object Array]');
	    }

	    function isDate(value) {
	      return (typeof value === 'object' &&
	          Object.prototype.toString.call(value) === '[object Date]');
	    }

	    function isRegExp(value) {
	      return (typeof value === 'object' &&
	          Object.prototype.toString.call(value) === '[object RegExp]');
	    }

	    function isSymbol(value) {
	      return (typeof value === 'symbol');
	    }

	    return {
	      isArray: (typeof Array.isArray === 'function') ?
	          function(obj) {
	            return Array.isArray(obj);
	          } : isArray,
	      isDate: isDate,
	      isRegExp: isRegExp,
	      isSymbol: (typeof Symbol === 'function') ?
	          isSymbol :
	          function() {
	            // always return false when Symbol is not supported.
	            return false;
	          }
	    };
	  }());

	  // fallback Buffer.isBuffer
	  isBuffer = (isNode) ?
	      function(obj) {
	        return Buffer.isBuffer(obj);
	      } :
	      function() {
	        // if browser, always return false
	        return false;
	      };

	  // fallback Object.keys for old browsers.
	  getKeys = (typeof Object.keys === 'function') ?
	      function(obj) {
	        return Object.keys(obj);
	      } :
	      function(obj) {
	        var keys = [],
	            key;

	        if (obj === null || typeof obj !== 'object') {
	          throw new TypeError('obj is not an Object');
	        }

	        for (key in obj) {
	          obj.hasOwnProperty(key) && keys.push(key);
	        }

	        return keys;
	      };

	  // get symbols in object.
	  getSymbols = (typeof Symbol === 'function') ?
	      function(obj) {
	        return Object.getOwnPropertySymbols(obj);
	      } :
	      function() {
	        // always return empty array when Symbol is not supported.
	        return [];
	      };

	  // fallback Array#indexOf for old browsers.
	  indexOfArray = (typeof Array.prototype.indexOf === 'function') ?
	      function(array, searchElement) {
	        return array.indexOf(searchElement);
	      } :
	      function(array, searchElement) {
	        var i, len;

	        if (!util.isArray(array)) {
	          throw new TypeError('array is not an Array');
	        }

	        for (i = 0, len = array.length; i < len; ++i) {
	          if (array[i] === searchElement) {
	            return i;
	          }
	        }

	        return -1;
	      };

	  /**
	   * recursive deep copy for value.
	   *
	   * @private
	   * @param {*} value copy target.
	   * @param {*} clone
	   * @param {Array} visited
	   * @param {Array} reference
	   * @return {*} copied value.
	   */
	  function copyValue_(value, clone, visited, reference) {
	    var str, pos, buf, keys, i, len, key, val, idx, obj, ref;

	    // number, string, boolean, null, undefined, function and symbol.
	    if (value === null || typeof value !== 'object') {
	      return value;
	    }

	    // Date.
	    if (util.isDate(value)) {
	      // Firefox need to convert to Number
	      //
	      // Firefox:
	      //   var date = new Date;
	      //   +date;            // 1420909365967
	      //   +new Date(date);  // 1420909365000
	      //   +new Date(+date); // 1420909365967
	      // Chrome:
	      //   var date = new Date;
	      //   +date;            // 1420909757913
	      //   +new Date(date);  // 1420909757913
	      //   +new Date(+date); // 1420909757913
	      return new Date(+value);
	    }

	    // RegExp.
	    if (util.isRegExp(value)) {
	      // Chrome, Safari:
	      //   (new RegExp).source => "(?:)"
	      // Firefox:
	      //   (new RegExp).source => ""
	      // Chrome, Safari, Firefox
	      //   String(new RegExp) => "/(?:)/"
	      str = String(value);
	      pos = str.lastIndexOf('/');

	      return new RegExp(str.slice(1, pos), str.slice(pos + 1));
	    }

	    // Buffer, node.js only.
	    if (isBuffer(value)) {
	      buf = new Buffer(value.length);
	      value.copy(buf);

	      return buf;
	    }

	    // Object or Array.
	    keys = getKeys(value).concat(getSymbols(value));

	    for (i = 0, len = keys.length; i < len; ++i) {
	      key = keys[i];
	      val = value[key];

	      if (val !== null && typeof val === 'object') {
	        idx = indexOfArray(visited, val);

	        if (idx === -1) {
	          // not circular reference
	          obj = (util.isArray(val)) ? [] : {};

	          visited.push(val);
	          reference.push(obj);
	        } else {
	          // circular reference
	          ref = reference[idx];
	        }
	      }

	      clone[key] = ref || copyValue_(val, obj, visited, reference);
	    }

	    return clone;
	  }

	  /**
	   * deep copy for value.
	   *
	   * @param {*} value copy target.
	   */
	  function deepcopy(value) {
	    var clone = (util.isArray(value)) ? [] : {},
	        visited = [value],
	        reference = [clone];

	    return copyValue_(value, clone, visited, reference);
	  }

	  return deepcopy;
	}));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19), __webpack_require__(18).Buffer))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * UUID.js: The RFC-compliant UUID generator for JavaScript.
	 *
	 * @fileOverview
	 * @author  LiosK
	 * @version 3.2
	 * @license The MIT License: Copyright (c) 2010-2012 LiosK.
	 */

	/** @constructor */
	var UUID;

	UUID = (function(overwrittenUUID) {

	// Core Component {{{

	/** @lends UUID */
	function UUID() {}

	/**
	 * The simplest function to get an UUID string.
	 * @returns {string} A version 4 UUID string.
	 */
	UUID.generate = function() {
	  var rand = UUID._getRandomInt, hex = UUID._hexAligner;
	  return  hex(rand(32), 8)          // time_low
	        + "-"
	        + hex(rand(16), 4)          // time_mid
	        + "-"
	        + hex(0x4000 | rand(12), 4) // time_hi_and_version
	        + "-"
	        + hex(0x8000 | rand(14), 4) // clock_seq_hi_and_reserved clock_seq_low
	        + "-"
	        + hex(rand(48), 12);        // node
	};

	/**
	 * Returns an unsigned x-bit random integer.
	 * @param {int} x A positive integer ranging from 0 to 53, inclusive.
	 * @returns {int} An unsigned x-bit random integer (0 <= f(x) < 2^x).
	 */
	UUID._getRandomInt = function(x) {
	  if (x <   0) return NaN;
	  if (x <= 30) return (0 | Math.random() * (1 <<      x));
	  if (x <= 53) return (0 | Math.random() * (1 <<     30))
	                    + (0 | Math.random() * (1 << x - 30)) * (1 << 30);
	  return NaN;
	};

	/**
	 * Returns a function that converts an integer to a zero-filled string.
	 * @param {int} radix
	 * @returns {function(num&#44; length)}
	 */
	UUID._getIntAligner = function(radix) {
	  return function(num, length) {
	    var str = num.toString(radix), i = length - str.length, z = "0";
	    for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
	    return str;
	  };
	};

	UUID._hexAligner = UUID._getIntAligner(16);

	// }}}

	// UUID Object Component {{{

	/**
	 * Names of each UUID field.
	 * @type string[]
	 * @constant
	 * @since 3.0
	 */
	UUID.FIELD_NAMES = ["timeLow", "timeMid", "timeHiAndVersion",
	                    "clockSeqHiAndReserved", "clockSeqLow", "node"];

	/**
	 * Sizes of each UUID field.
	 * @type int[]
	 * @constant
	 * @since 3.0
	 */
	UUID.FIELD_SIZES = [32, 16, 16, 8, 8, 48];

	/**
	 * Generates a version 4 {@link UUID}.
	 * @returns {UUID} A version 4 {@link UUID} object.
	 * @since 3.0
	 */
	UUID.genV4 = function() {
	  var rand = UUID._getRandomInt;
	  return new UUID()._init(rand(32), rand(16), // time_low time_mid
	                          0x4000 | rand(12),  // time_hi_and_version
	                          0x80   | rand(6),   // clock_seq_hi_and_reserved
	                          rand(8), rand(48)); // clock_seq_low node
	};

	/**
	 * Converts hexadecimal UUID string to an {@link UUID} object.
	 * @param {string} strId UUID hexadecimal string representation ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
	 * @returns {UUID} {@link UUID} object or null.
	 * @since 3.0
	 */
	UUID.parse = function(strId) {
	  var r, p = /^\s*(urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(\})?\s*$/i;
	  if (r = p.exec(strId)) {
	    var l = r[1] || "", t = r[8] || "";
	    if (((l + t) === "") ||
	        (l === "{" && t === "}") ||
	        (l.toLowerCase() === "urn:uuid:" && t === "")) {
	      return new UUID()._init(parseInt(r[2], 16), parseInt(r[3], 16),
	                              parseInt(r[4], 16), parseInt(r[5], 16),
	                              parseInt(r[6], 16), parseInt(r[7], 16));
	    }
	  }
	  return null;
	};

	/**
	 * Initializes {@link UUID} object.
	 * @param {uint32} [timeLow=0] time_low field (octet 0-3).
	 * @param {uint16} [timeMid=0] time_mid field (octet 4-5).
	 * @param {uint16} [timeHiAndVersion=0] time_hi_and_version field (octet 6-7).
	 * @param {uint8} [clockSeqHiAndReserved=0] clock_seq_hi_and_reserved field (octet 8).
	 * @param {uint8} [clockSeqLow=0] clock_seq_low field (octet 9).
	 * @param {uint48} [node=0] node field (octet 10-15).
	 * @returns {UUID} this.
	 */
	UUID.prototype._init = function() {
	  var names = UUID.FIELD_NAMES, sizes = UUID.FIELD_SIZES;
	  var bin = UUID._binAligner, hex = UUID._hexAligner;

	  /**
	   * List of UUID field values (as integer values).
	   * @type int[]
	   */
	  this.intFields = new Array(6);

	  /**
	   * List of UUID field values (as binary bit string values).
	   * @type string[]
	   */
	  this.bitFields = new Array(6);

	  /**
	   * List of UUID field values (as hexadecimal string values).
	   * @type string[]
	   */
	  this.hexFields = new Array(6);

	  for (var i = 0; i < 6; i++) {
	    var intValue = parseInt(arguments[i] || 0);
	    this.intFields[i] = this.intFields[names[i]] = intValue;
	    this.bitFields[i] = this.bitFields[names[i]] = bin(intValue, sizes[i]);
	    this.hexFields[i] = this.hexFields[names[i]] = hex(intValue, sizes[i] / 4);
	  }

	  /**
	   * UUID version number defined in RFC 4122.
	   * @type int
	   */
	  this.version = (this.intFields.timeHiAndVersion >> 12) & 0xF;

	  /**
	   * 128-bit binary bit string representation.
	   * @type string
	   */
	  this.bitString = this.bitFields.join("");

	  /**
	   * UUID hexadecimal string representation ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
	   * @type string
	   */
	  this.hexString = this.hexFields[0] + "-" + this.hexFields[1] + "-" + this.hexFields[2]
	                 + "-" + this.hexFields[3] + this.hexFields[4] + "-" + this.hexFields[5];

	  /**
	   * UUID string representation as a URN ("urn:uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
	   * @type string
	   */
	  this.urn = "urn:uuid:" + this.hexString;

	  return this;
	};

	UUID._binAligner = UUID._getIntAligner(2);

	/**
	 * Returns UUID string representation.
	 * @returns {string} {@link UUID#hexString}.
	 */
	UUID.prototype.toString = function() { return this.hexString; };

	/**
	 * Tests if two {@link UUID} objects are equal.
	 * @param {UUID} uuid
	 * @returns {bool} True if two {@link UUID} objects are equal.
	 */
	UUID.prototype.equals = function(uuid) {
	  if (!(uuid instanceof UUID)) { return false; }
	  for (var i = 0; i < 6; i++) {
	    if (this.intFields[i] !== uuid.intFields[i]) { return false; }
	  }
	  return true;
	};

	// }}}

	// UUID Version 1 Component {{{

	/**
	 * Generates a version 1 {@link UUID}.
	 * @returns {UUID} A version 1 {@link UUID} object.
	 * @since 3.0
	 */
	UUID.genV1 = function() {
	  var now = new Date().getTime(), st = UUID._state;
	  if (now != st.timestamp) {
	    if (now < st.timestamp) { st.sequence++; }
	    st.timestamp = now;
	    st.tick = UUID._getRandomInt(4);
	  } else if (Math.random() < UUID._tsRatio && st.tick < 9984) {
	    // advance the timestamp fraction at a probability
	    // to compensate for the low timestamp resolution
	    st.tick += 1 + UUID._getRandomInt(4);
	  } else {
	    st.sequence++;
	  }

	  // format time fields
	  var tf = UUID._getTimeFieldValues(st.timestamp);
	  var tl = tf.low + st.tick;
	  var thav = (tf.hi & 0xFFF) | 0x1000;  // set version '0001'

	  // format clock sequence
	  st.sequence &= 0x3FFF;
	  var cshar = (st.sequence >>> 8) | 0x80; // set variant '10'
	  var csl = st.sequence & 0xFF;

	  return new UUID()._init(tl, tf.mid, thav, cshar, csl, st.node);
	};

	/**
	 * Re-initializes version 1 UUID state.
	 * @since 3.0
	 */
	UUID.resetState = function() {
	  UUID._state = new UUID._state.constructor();
	};

	/**
	 * Probability to advance the timestamp fraction: the ratio of tick movements to sequence increments.
	 * @type float
	 */
	UUID._tsRatio = 1 / 4;

	/**
	 * Persistent state for UUID version 1.
	 * @type UUIDState
	 */
	UUID._state = new function UUIDState() {
	  var rand = UUID._getRandomInt;
	  this.timestamp = 0;
	  this.sequence = rand(14);
	  this.node = (rand(8) | 1) * 0x10000000000 + rand(40); // set multicast bit '1'
	  this.tick = rand(4);  // timestamp fraction smaller than a millisecond
	};

	/**
	 * @param {Date|int} time ECMAScript Date Object or milliseconds from 1970-01-01.
	 * @returns {object}
	 */
	UUID._getTimeFieldValues = function(time) {
	  var ts = time - Date.UTC(1582, 9, 15);
	  var hm = ((ts / 0x100000000) * 10000) & 0xFFFFFFF;
	  return  { low: ((ts & 0xFFFFFFF) * 10000) % 0x100000000,
	            mid: hm & 0xFFFF, hi: hm >>> 16, timestamp: ts };
	};

	// }}}

	// Misc. Component {{{

	/**
	 * Reinstalls {@link UUID.generate} method to emulate the interface of UUID.js version 2.x.
	 * @since 3.1
	 * @deprecated Version 2.x. compatible interface is not recommended.
	 */
	UUID.makeBackwardCompatible = function() {
	  var f = UUID.generate;
	  UUID.generate = function(o) {
	    return (o && o.version == 1) ? UUID.genV1().hexString : f.call(UUID);
	  };
	  UUID.makeBackwardCompatible = function() {};
	};

	/**
	 * Preserves the value of 'UUID' global variable set before the load of UUID.js.
	 * @since 3.2
	 * @type object
	 */
	UUID.overwrittenUUID = overwrittenUUID;

	// }}}

	return UUID;

	})(UUID);

	// vim: et ts=2 sw=2 fdm=marker fmr&


	/*** EXPORTS FROM exports-loader ***/
	module.exports = UUID

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Mixin, React, _me, componentFactory, elemAtPos, extend, freezeScreenListner, getPinchProps, getTouchProps, isDataOrAriaProp, startScreenMovement, stopScreenMovement;

	React = __webpack_require__(16);

	_me = module.exports;

	extend = __webpack_require__(22);

	getTouchProps = function(touch) {
	  if (!touch) {
	    return {};
	  }
	  return {
	    pageX: touch.pageX,
	    pageY: touch.pageY,
	    clientX: touch.clientX,
	    clientY: touch.clientY
	  };
	};

	elemAtPos = function(x, y) {
	  return document.elementFromPoint(x, y);
	};

	getPinchProps = function(touches) {
	  return {
	    touches: Array.prototype.map.call(touches, function(touch) {
	      return {
	        identifier: touch.identifier,
	        pageX: touch.pageX,
	        pageY: touch.pageY
	      };
	    }),
	    center: {
	      x: (touches[0].pageX + touches[1].pageX) / 2,
	      y: (touches[0].pageY + touches[1].pageY) / 2
	    },
	    angle: Math.atan() * (touches[1].pageY - touches[0].pageY) / (touches[1].pageX - touches[0].pageX) * 180 / Math.PI,
	    distance: Math.sqrt(Math.pow(Math.abs(touches[1].pageX - touches[0].pageX), 2) + Math.pow(Math.abs(touches[1].pageY - touches[0].pageY), 2))
	  };
	};

	React.initializeTouchEvents(true);

	
	/**
	 * Tappable Mixin
	 * ==============
	 */

	freezeScreenListner = function(event) {
	  event.preventDefault();
	  return null;
	};

	stopScreenMovement = function() {
	  return document.body.addEventListener('touchmove', freezeScreenListner, false);
	};

	startScreenMovement = function() {
	  return document.body.removeEventListener("touchmove", freezeScreenListner);
	};

	Mixin = {
	  propTypes: {
	    moveThreshold: React.PropTypes.number,
	    pressDelay: React.PropTypes.number,
	    pressMoveThreshold: React.PropTypes.number,
	    preventDefault: React.PropTypes.bool,
	    stopPropagation: React.PropTypes.bool,
	    onTap: React.PropTypes.func,
	    onPress: React.PropTypes.func,
	    onTouchStart: React.PropTypes.func,
	    onTouchMove: React.PropTypes.func,
	    onTouchEnd: React.PropTypes.func,
	    onMouseDown: React.PropTypes.func,
	    onMouseUp: React.PropTypes.func,
	    onMouseMove: React.PropTypes.func,
	    onMouseOut: React.PropTypes.func,
	    onPinchStart: React.PropTypes.func,
	    onPinchMove: React.PropTypes.func,
	    onPinchEnd: React.PropTypes.func,
	    onSwipeLeft: React.PropTypes.func,
	    onSwipeRight: React.PropTypes.func,
	    onSwipeUp: React.PropTypes.func,
	    onSwipeDown: React.PropTypes.func
	  },
	  getDefaultProps: function() {
	    return {
	      moveThreshold: 30,
	      pressDelay: 1000,
	      pressMoveThreshold: 5
	    };
	  },
	  getInitialState: function() {
	    return {
	      isActive: false,
	      touchActive: false,
	      pinchActive: false
	    };
	  },
	  componentWillUnmount: function() {
	    this.cleanupScrollDetection();
	    this.cancelPressDetection();
	  },
	  processEvent: function(event) {
	    if (this.props.preventDefault) {
	      event.preventDefault();
	    }
	    if (this.props.stopPropagation) {
	      event.stopPropagation();
	    }
	  },
	  onTouchStart: function(event) {
	    stopScreenMovement();
	    if (this.props.onTouchStart && this.props.onTouchStart(event) === false) {
	      return;
	    }
	    this.processEvent(event);
	    window._blockMouseEvents = true;
	    if (event.touches.length === 1) {
	      this._initialTouch = this._lastTouch = getTouchProps(event.touches[0]);
	      this.initScrollDetection();
	      this.initPressDetection(event, this.endTouch);
	      this.setState({
	        isActive: true
	      });
	    } else if ((this.props.onPinchStart || this.props.onPinchMove || this.props.onPinchEnd) && event.touches.length === 2) {
	      this.onPinchStart(event);
	    }
	  },
	  onPinchStart: function(event) {
	    var touches;
	    if (this._initialTouch) {
	      this.endTouch();
	    }
	    touches = event.touches;
	    this._initialPinch = getPinchProps(touches);
	    this._initialPinch = extend(this._initialPinch, {
	      displacement: {
	        x: 0,
	        y: 0
	      },
	      displacementVelocity: {
	        x: 0,
	        y: 0
	      },
	      rotation: 0,
	      rotationVelocity: 0,
	      zoom: 1,
	      zoomVelocity: 0,
	      time: Date.now()
	    });
	    this._lastPinch = this._initialPinch;
	    this.props.onPinchStart && this.props.onPinchStart(this._initialPinch, event);
	  },
	  onPinchMove: function(event) {
	    var currentPinch, timeSinceLastPinch, touches;
	    if (this._initialTouch) {
	      this.endTouch();
	    }
	    touches = event.touches;
	    currentPinch = getPinchProps(touches);
	    currentPinch.displacement = {
	      x: currentPinch.center.x - this._initialPinch.center.x,
	      y: currentPinch.center.y - this._initialPinch.center.y
	    };
	    currentPinch.time = Date.now();
	    timeSinceLastPinch = currentPinch.time - this._lastPinch.time;
	    currentPinch.displacementVelocity = {
	      x: (currentPinch.displacement.x - this._lastPinch.displacement.x) / timeSinceLastPinch,
	      y: (currentPinch.displacement.y - this._lastPinch.displacement.y) / timeSinceLastPinch
	    };
	    currentPinch.rotation = currentPinch.angle - this._initialPinch.angle;
	    currentPinch.rotationVelocity = currentPinch.rotation - this._lastPinch.rotation / timeSinceLastPinch;
	    currentPinch.zoom = currentPinch.distance / this._initialPinch.distance;
	    currentPinch.zoomVelocity = (currentPinch.zoom - this._lastPinch.zoom) / timeSinceLastPinch;
	    this.props.onPinchMove && this.props.onPinchMove(currentPinch, event);
	    this._lastPinch = currentPinch;
	  },
	  onPinchEnd: function(event) {
	    var currentPinch;
	    currentPinch = extend({}, this._lastPinch);
	    currentPinch.time = Date.now();
	    if (currentPinch.time - this._lastPinch.time > 16) {
	      currentPinch.displacementVelocity = 0;
	      currentPinch.rotationVelocity = 0;
	      currentPinch.zoomVelocity = 0;
	    }
	    this.props.onPinchEnd && this.props.onPinchEnd(currentPinch, event);
	    this._initialPinch = this._lastPinch = null;
	    if (event.touches.length === 1) {
	      this.onTouchStart(event);
	    }
	  },
	  initScrollDetection: function() {
	    var node;
	    this._scrollParents = [];
	    this._scrollPos = {
	      top: 0,
	      left: 0
	    };
	    node = this.getDOMNode();
	    while (node) {
	      if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
	        this._scrollParents.push(node);
	        this._scrollPos.top += node.scrollTop;
	        this._scrollPos.left += node.scrollLeft;
	      }
	      node = node.parentNode;
	    }
	  },
	  calculateMovement: function(touch) {
	    return {
	      x: Math.abs(touch.clientX - this._initialTouch.clientX),
	      y: Math.abs(touch.clientY - this._initialTouch.clientY),
	      xDirectionLeft: touch.clientX < this._initialTouch.clientX,
	      yDirectionUp: touch.clientY < this._initialTouch.clientY
	    };
	  },
	  detectScroll: function() {
	    var currentScrollPos, i;
	    currentScrollPos = {
	      top: 0,
	      left: 0
	    };
	    i = 0;
	    while (i < this._scrollParents.length) {
	      currentScrollPos.top += this._scrollParents[i].scrollTop;
	      currentScrollPos.left += this._scrollParents[i].scrollLeft;
	      i++;
	    }
	    return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left);
	  },
	  cleanupScrollDetection: function() {
	    this._scrollParents = void 0;
	    this._scrollPos = void 0;
	  },
	  initPressDetection: function(event, callback) {
	    if (!this.props.onPress) {
	      return;
	    }
	    this._pressTimeout = setTimeout((function() {
	      this.props.onPress(event);
	      callback();
	    }).bind(this), this.props.pressDelay);
	  },
	  cancelPressDetection: function() {
	    clearTimeout(this._pressTimeout);
	  },
	  onTouchMove: function(event) {
	    var movement;
	    if (this._initialTouch) {
	      this.processEvent(event);
	      if (this.detectScroll()) {
	        return this.endTouch(event);
	      }
	      this.props.onTouchMove && this.props.onTouchMove(event);
	      this._lastTouch = getTouchProps(event.touches[0]);
	      movement = this.calculateMovement(this._lastTouch);
	      if (movement.x > this.props.pressMoveThreshold || movement.y > this.props.pressMoveThreshold) {
	        this.cancelPressDetection();
	      }
	      if (movement.x > this.props.moveThreshold || movement.y > this.props.moveThreshold) {
	        if (this.state.isActive) {
	          this.setState({
	            isActive: false
	          });
	        }
	      } else {
	        if (!this.state.isActive) {
	          this.setState({
	            isActive: true
	          });
	        }
	      }
	    } else if (this._initialPinch && event.touches.length === 2) {
	      this.onPinchMove(event);
	      event.preventDefault();
	    }
	  },
	  onTouchEnd: function(event) {
	    var ele, movement;
	    if (this._initialTouch) {
	      this.processEvent(event);
	      movement = this.calculateMovement(this._lastTouch);
	      ele = elemAtPos(this._lastTouch.pageX, this._lastTouch.pageY);
	      if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold && this.props.onTap) {
	        this.props.onTap(event);
	      } else if (movement.x >= movement.y && movement.x > this.props.moveThreshold) {
	        if (movement.xDirectionLeft && this.props.onSwipeLeft) {
	          this.props.onSwipeLeft(event, ele);
	        } else if ((!movement.xDirectionLeft) && this.props.onSwipeRight) {
	          this.props.onSwipeRight(event, ele);
	        }
	      } else if (movement.y > movement.x && movement.y > this.props.moveThreshold) {
	        if (movement.yDirectionUp && this.props.onSwipeUp) {
	          this.props.onSwipeUp(event, ele);
	        } else if ((!movement.yDirectionUp) && this.props.onSwipeDown) {
	          this.props.onSwipeDown(event, ele);
	        }
	      }
	      this.endTouch(event);
	    } else if (this._initialPinch && event.touches.length + event.changedTouches.length === 2) {
	      this.onPinchEnd(event);
	      event.preventDefault();
	    }
	  },
	  endTouch: function(event) {
	    this.cancelPressDetection();
	    if (event && this.props.onTouchEnd) {
	      this.props.onTouchEnd(event);
	    }
	    this._initialTouch = null;
	    this._lastTouch = null;
	    this.setState({
	      isActive: false
	    });
	    startScreenMovement();
	  },
	  onMouseDown: function(event) {
	    if (window._blockMouseEvents) {
	      window._blockMouseEvents = false;
	      return;
	    }
	    if (this.props.onMouseDown && this.props.onMouseDown(event) === false) {
	      return;
	    }
	    this.processEvent(event);
	    this.initPressDetection(event, this.endMouseEvent);
	    this._mouseDown = true;
	    this.setState({
	      isActive: true
	    });
	  },
	  onMouseMove: function(event) {
	    if (window._blockMouseEvents || !this._mouseDown) {
	      return;
	    }
	    this.processEvent(event);
	    this.props.onMouseMove && this.props.onMouseMove(event);
	  },
	  onMouseUp: function(event) {
	    if (window._blockMouseEvents || !this._mouseDown) {
	      return;
	    }
	    this.processEvent(event);
	    this.props.onMouseUp && this.props.onMouseUp(event);
	    this.props.onTap && this.props.onTap(event);
	    this.endMouseEvent();
	  },
	  onMouseOut: function(event) {
	    if (window._blockMouseEvents || !this._mouseDown) {
	      return;
	    }
	    this.processEvent(event);
	    this.props.onMouseOut && this.props.onMouseOut(event);
	    this.endMouseEvent();
	  },
	  endMouseEvent: function() {
	    this.cancelPressDetection();
	    this._mouseDown = false;
	    this.setState({
	      isActive: false
	    });
	  },
	  touchStyles: function() {
	    return {
	      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	      WebkitTouchCallout: 'none',
	      WebkitUserSelect: 'none',
	      KhtmlUserSelect: 'none',
	      MozUserSelect: 'none',
	      msUserSelect: 'none',
	      userSelect: 'none',
	      cursor: 'pointer'
	    };
	  },
	  handlers: function() {
	    return {
	      onTouchStart: this.onTouchStart,
	      onTouchMove: this.onTouchMove,
	      onTouchEnd: this.onTouchEnd,
	      onMouseDown: this.onMouseDown,
	      onMouseUp: this.onMouseUp,
	      onMouseMove: this.onMouseMove,
	      onMouseOut: this.onMouseOut
	    };
	  }
	};

	
	/**
	 * Tappable Component
	 * ==================
	 */

	isDataOrAriaProp = function(key) {
	  return key.indexOf('data-') === 0 || key.indexOf('aria-') === 0;
	};

	componentFactory = function(ele) {
	  return React.createClass({
	    displayName: 'touch-' + ele,
	    mixins: [Mixin],
	    propTypes: {
	      component: React.PropTypes.any,
	      className: React.PropTypes.string,
	      classBase: React.PropTypes.string,
	      style: React.PropTypes.object,
	      disabled: React.PropTypes.bool
	    },
	    getDefaultProps: function() {
	      return {
	        component: ele,
	        classBase: 'touch'
	      };
	    },
	    nullFunc: function() {
	      return null;
	    },
	    render: function() {
	      var className, dataOrAriaPropNames, newComponentProps, props, style;
	      props = this.props;
	      className = props.classBase + (this.state.isActive ? '-active' : '-inactive');
	      if (props.className) {
	        className += ' ' + props.className;
	      }
	      style = {};
	      extend(style, this.touchStyles(), props.style);
	      newComponentProps = {
	        style: style,
	        className: className,
	        disabled: props.disabled,
	        onTouchStart: this.onTouchStart,
	        onTouchMove: this.onTouchMove,
	        onTouchEnd: this.onTouchEnd,
	        onMouseDown: this.onMouseDown,
	        onMouseMove: this.onMouseMove,
	        onMouseUp: this.onMouseUp,
	        onMouseOut: this.onMouseOut
	      };
	      dataOrAriaPropNames = Object.keys(props).filter(isDataOrAriaProp);
	      dataOrAriaPropNames.forEach(function(propName) {
	        newComponentProps[propName] = props[propName];
	      });
	      return React.createElement(props.component, newComponentProps, props.children);
	    }
	  });
	};

	_me.te = componentFactory;
	

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys = __webpack_require__(1);
	var foreach = __webpack_require__(23);

	var toStr = Object.prototype.toString;

	var isFunction = function (fn) {
		return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
	};

	var arePropertyDescriptorsSupported = function () {
		var obj = {};
		try {
			Object.defineProperty(obj, 'x', { value: obj });
			return obj.x === obj;
		} catch (e) { /* this is IE 8. */
			return false;
		}
	};
	var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

	var defineProperty = function (object, name, value, predicate) {
		if (name in object && (!isFunction(predicate) || !predicate())) {
			return;
		}
		if (supportsDescriptors) {
			Object.defineProperty(object, name, {
				configurable: true,
				enumerable: false,
				writable: true,
				value: value
			});
		} else {
			object[name] = value;
		}
	};

	var defineProperties = function (object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		foreach(keys(map), function (name) {
			defineProperty(object, name, map[name], predicates[name]);
		});
	};

	defineProperties.supportsDescriptors = !!supportsDescriptors;

	module.exports = defineProperties;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var base64 = __webpack_require__(27)
	var ieee754 = __webpack_require__(25)
	var isArray = __webpack_require__(26)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var kMaxLength = 0x3fffffff
	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
	    return fromTypedArray(that, object)
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength.toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = String(string)

	  if (string.length === 0) return 0

	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      return string.length
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return string.length * 2
	    case 'hex':
	      return string.length >>> 1
	    case 'utf8':
	    case 'utf-8':
	      return utf8ToBytes(string).length
	    case 'base64':
	      return base64ToBytes(string).length
	    default:
	      return string.length
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	// toString(encoding, start=0, end=buffer.length)
	Buffer.prototype.toString = function toString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }

	  return res + decodeUtf8Char(tmp)
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start

	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	  var i = 0

	  for (; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (leadSurrogate) {
	        // 2 leads in a row
	        if (codePoint < 0xDC00) {
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          leadSurrogate = codePoint
	          continue
	        } else {
	          // valid surrogate pair
	          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	          leadSurrogate = null
	        }
	      } else {
	        // no lead yet

	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else {
	          // valid lead
	          leadSurrogate = codePoint
	          continue
	        }
	      }
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	      leadSurrogate = null
	    }

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x200000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18).Buffer))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (!draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(24);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(28);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(19)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toStr = Object.prototype.toString;

	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]'
				&& value !== null
				&& typeof value === 'object'
				&& typeof value.length === 'number'
				&& value.length >= 0
				&& toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	'use strict';

	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }

	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  return to;
	}

	module.exports = assign;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	
	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;

	module.exports = function forEach (obj, fn, ctx) {
	    if (toString.call(fn) !== '[object Function]') {
	        throw new TypeError('iterator must be a function');
	    }
	    var l = obj.length;
	    if (l === +l) {
	        for (var i = 0; i < l; i++) {
	            fn.call(ctx, obj[i], i, obj);
	        }
	    } else {
	        for (var k in obj) {
	            if (hasOwn.call(obj, k)) {
	                fn.call(ctx, obj[k], k, obj);
	            }
	        }
	    }
	};



/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = -7,
	      i = isLE ? (nBytes - 1) : 0,
	      d = isLE ? -1 : 1,
	      s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	      i = isLE ? 0 : (nBytes - 1),
	      d = isLE ? 1 : -1,
	      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(31)();
	exports.push([module.id, "/*! normalize.css v3.0.2 | MIT License | git.io/normalize */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome\n *    (include `-moz` to future-proof).\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box; /* 2 */\n  box-sizing: content-box;\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}", ""]);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(31)();
	exports.push([module.id, "/*\n* Skeleton V2.0.4\n* Copyright 2014, Dave Gamache\n* www.getskeleton.com\n* Free to use under the MIT license.\n* http://www.opensource.org/licenses/mit-license.php\n* 12/29/2014\n*/\n\n\n/* Table of contents\n––––––––––––––––––––––––––––––––––––––––––––––––––\n- Grid\n- Base Styles\n- Typography\n- Links\n- Buttons\n- Forms\n- Lists\n- Code\n- Tables\n- Spacing\n- Utilities\n- Clearing\n- Media Queries\n*/\n\n\n/* Grid\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n.container {\n  position: relative;\n  width: 100%;\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 0 0px;\n  box-sizing: border-box; }\n.column,\n.columns {\n  width: 100%;\n  float: left;\n  box-sizing: border-box; }\n\n/* For devices larger than 400px */\n@media (min-width: 400px) {\n  .container {\n    width: 95%;\n    padding: 0 10px; }\n}\n\n/* For devices larger than 550px */\n@media (min-width: 550px) {\n  .container {\n    width: 95%; \n    padding: 0 10px; }\n  .column,\n  .columns {\n    margin-left: 4%; }\n  .column:first-child,\n  .columns:first-child {\n    margin-left: 0; }\n\n  .one.column,\n  .one.columns                    { width: 4.66666666667%; }\n  .two.columns                    { width: 13.3333333333%; }\n  .three.columns                  { width: 22%;            }\n  .four.columns                   { width: 30.6666666667%; }\n  .five.columns                   { width: 39.3333333333%; }\n  .six.columns                    { width: 48%;            }\n  .seven.columns                  { width: 56.6666666667%; }\n  .eight.columns                  { width: 65.3333333333%; }\n  .nine.columns                   { width: 74.0%;          }\n  .ten.columns                    { width: 82.6666666667%; }\n  .eleven.columns                 { width: 91.3333333333%; }\n  .twelve.columns                 { width: 100%; margin-left: 0; }\n\n  .one-third.column               { width: 30.6666666667%; }\n  .two-thirds.column              { width: 65.3333333333%; }\n\n  .one-half.column                { width: 48%; }\n\n  /* Offsets */\n  .offset-by-one.column,\n  .offset-by-one.columns          { margin-left: 8.66666666667%; }\n  .offset-by-two.column,\n  .offset-by-two.columns          { margin-left: 17.3333333333%; }\n  .offset-by-three.column,\n  .offset-by-three.columns        { margin-left: 26%;            }\n  .offset-by-four.column,\n  .offset-by-four.columns         { margin-left: 34.6666666667%; }\n  .offset-by-five.column,\n  .offset-by-five.columns         { margin-left: 43.3333333333%; }\n  .offset-by-six.column,\n  .offset-by-six.columns          { margin-left: 52%;            }\n  .offset-by-seven.column,\n  .offset-by-seven.columns        { margin-left: 60.6666666667%; }\n  .offset-by-eight.column,\n  .offset-by-eight.columns        { margin-left: 69.3333333333%; }\n  .offset-by-nine.column,\n  .offset-by-nine.columns         { margin-left: 78.0%;          }\n  .offset-by-ten.column,\n  .offset-by-ten.columns          { margin-left: 86.6666666667%; }\n  .offset-by-eleven.column,\n  .offset-by-eleven.columns       { margin-left: 95.3333333333%; }\n\n  .offset-by-one-third.column,\n  .offset-by-one-third.columns    { margin-left: 34.6666666667%; }\n  .offset-by-two-thirds.column,\n  .offset-by-two-thirds.columns   { margin-left: 69.3333333333%; }\n\n  .offset-by-one-half.column,\n  .offset-by-one-half.columns     { margin-left: 52%; }\n\n  /* Offsets */\n  .right-offset-by-one.column,\n  .right-offset-by-one.columns          { margin-right: 8.66666666667%; }\n  .right-offset-by-two.column,\n  .right-offset-by-two.columns          { margin-right: 17.3333333333%; }\n  .right-offset-by-three.column,\n  .right-offset-by-three.columns        { margin-right: 26%;            }\n  .right-offset-by-four.column,\n  .right-offset-by-four.columns         { margin-right: 34.6666666667%; }\n  .right-offset-by-five.column,\n  .right-offset-by-five.columns         { margin-right: 43.3333333333%; }\n  .right-offset-by-six.column,\n  .right-offset-by-six.columns          { margin-right: 52%;            }\n  .right-offset-by-seven.column,\n  .right-offset-by-seven.columns        { margin-right: 60.6666666667%; }\n  .right-offset-by-eight.column,\n  .right-offset-by-eight.columns        { margin-right: 69.3333333333%; }\n  .right-offset-by-nine.column,\n  .right-offset-by-nine.columns         { margin-right: 78.0%;          }\n  .right-offset-by-ten.column,\n  .right-offset-by-ten.columns          { margin-right: 86.6666666667%; }\n  .right-offset-by-eleven.column,\n  .right-offset-by-eleven.columns       { margin-right: 95.3333333333%; }\n\n  .right-offset-by-one-third.column,\n  .right-offset-by-one-third.columns    { margin-right: 34.6666666667%; }\n  .right-offset-by-two-thirds.column,\n  .right-offset-by-two-thirds.columns   { margin-right: 69.3333333333%; }\n\n  .right-offset-by-one-half.column,\n  .right-offset-by-one-half.columns     { margin-right: 52%; }\n\n}\n\n\n/* Base Styles\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n/* NOTE\nhtml is set to 62.5% so that all the REM measurements throughout Skeleton\nare based on 10px sizing. So basically 1.5rem = 15px :) */\nhtml {\n  font-size: 62.5%; }\nbody {\n  font-size: 1.5em; /* currently ems cause chrome bug misinterpreting rems on body element */\n  line-height: 1.6;\n  font-weight: 400;\n  font-family: \"Raleway\", \"HelveticaNeue\", \"Helvetica Neue\", Helvetica, Arial, sans-serif, meiryo;\n  color: #222; }\n\n\n/* Typography\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: 2rem;\n  font-weight: 300; }\nh1 { font-size: 4.0rem; line-height: 1.2;  letter-spacing: -.1rem;}\nh2 { font-size: 3.6rem; line-height: 1.25; letter-spacing: -.1rem; }\nh3 { font-size: 3.0rem; line-height: 1.3;  letter-spacing: -.1rem; }\nh4 { font-size: 2.4rem; line-height: 1.35; letter-spacing: -.08rem; }\nh5 { font-size: 1.8rem; line-height: 1.5;  letter-spacing: -.05rem; }\nh6 { font-size: 1.5rem; line-height: 1.6;  letter-spacing: 0; }\n\n/* Larger than phablet */\n@media (min-width: 550px) {\n  h1 { font-size: 5.0rem; }\n  h2 { font-size: 4.2rem; }\n  h3 { font-size: 3.6rem; }\n  h4 { font-size: 3.0rem; }\n  h5 { font-size: 2.4rem; }\n  h6 { font-size: 1.5rem; }\n}\n\np {\n  margin-top: 0; }\n\n\n/* Links\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\na {\n  color: #1EAEDB; }\na:hover {\n  color: #0FA0CE; }\n\n\n/* Buttons\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n.button,\nbutton,\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n  display: inline-block;\n  height: 34px;\n  /*height: 44pt;*/\n  padding: 0 14px;\n  color: #555;\n  text-align: center;\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 18px;\n  letter-spacing: .1rem;\n  text-transform: uppercase;\n  text-decoration: none;\n  white-space: nowrap;\n  background-color: transparent;\n  border-radius: 4px;\n  border: 1px solid #bbb;\n  cursor: pointer;\n  box-sizing: border-box; }\n.button:hover,\nbutton:hover,\ninput[type=\"submit\"]:hover,\ninput[type=\"reset\"]:hover,\ninput[type=\"button\"]:hover,\n.button:focus,\nbutton:focus,\ninput[type=\"submit\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"button\"]:focus {\n  color: #333;\n  border-color: #888;\n  outline: 0; }\n.button.button-primary,\nbutton.button-primary,\ninput[type=\"submit\"].button-primary,\ninput[type=\"reset\"].button-primary,\ninput[type=\"button\"].button-primary {\n  color: #FFF;\n  background-color: #33C3F0;\n  border-color: #33C3F0; }\n.button.button-primary:hover,\nbutton.button-primary:hover,\ninput[type=\"submit\"].button-primary:hover,\ninput[type=\"reset\"].button-primary:hover,\ninput[type=\"button\"].button-primary:hover,\n.button.button-primary:focus,\nbutton.button-primary:focus,\ninput[type=\"submit\"].button-primary:focus,\ninput[type=\"reset\"].button-primary:focus,\ninput[type=\"button\"].button-primary:focus {\n  color: #FFF;\n  background-color: #1EAEDB;\n  border-color: #1EAEDB; }\n\n\n/* Forms\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ntextarea,\nselect {\n  height: 34px;\n  padding: 1px 8px; /* The 6px vertically centers text on FF, ignored by Webkit */\n  background-color: #fff;\n  border: 1px solid #D1D1D1;\n  border-radius: 4px;\n  box-shadow: none;\n  box-sizing: border-box; }\n/* Removes awkward default styles on some inputs for iOS */\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ntextarea {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none; }\ntextarea {\n\theight: 25px;\n  min-height: 65px;\n  padding-top: 6px;\n  padding-bottom: 6px; }\ninput[type=\"email\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ntextarea:focus,\nselect:focus {\n  border: 1px solid #33C3F0;\n  outline: 0; }\nlabel,\nlegend {\n  display: block;\n  margin-bottom: .5rem;\n  font-weight: 600; }\nfieldset {\n  padding: 0;\n  border-width: 0; }\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  display: inline; }\nlabel > .label-body {\n  display: inline-block;\n  margin-left: .5rem;\n  font-weight: normal; }\n\n\n/* Lists\n–––––––––––––––––––––––––––––––––––––––––––––––––– \nul {\n  list-style: circle inside; }\nol {\n  list-style: decimal inside; }\nol, ul {\n  padding-left: 0;\n  margin-top: 0; }\nul ul,\nul ol,\nol ol,\nol ul {\n  margin: 1.5rem 0 1.5rem 3rem;\n  font-size: 90%; }\nli {\n  margin-bottom: 1rem; }\n*/\n\n/* Code\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\ncode {\n  padding: .2rem .5rem;\n  margin: 0 .2rem;\n  font-size: 90%;\n  white-space: nowrap;\n  background: #F1F1F1;\n  border: 1px solid #E1E1E1;\n  border-radius: 4px; }\npre > code {\n  display: block;\n  padding: 1rem 1.5rem;\n  white-space: pre; }\n\n\n/* Tables\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nth,\ntd {\n  padding: 12px 15px;\n  text-align: left;\n  border-bottom: 1px solid #E1E1E1; }\nth:first-child,\ntd:first-child {\n  padding-left: 0; }\nth:last-child,\ntd:last-child {\n  padding-right: 0; }\n\n\n/* Spacing\n––––––––––––––––––––––––––––––––––––––––––––––––––\nbutton,\n.button {\n  margin-bottom: 1rem; }\ninput,\ntextarea,\nselect,\nfieldset {\n  margin-bottom: 1.5rem; }\npre,\nblockquote,\ndl,\nfigure,\ntable,\np,\nul,\nol,\nform {\n  margin-bottom: 2.5rem; }\n */\n\n/* Utilities\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n.u-full-width {\n  width: 100%;\n  box-sizing: border-box; }\n.u-max-full-width {\n  max-width: 100%;\n  box-sizing: border-box; }\n.u-pull-right {\n  float: right; }\n.u-pull-left {\n  float: left; }\n\n\n/* Misc\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\nhr {\n  margin-top: 3rem;\n  margin-bottom: 3.5rem;\n  border-width: 0;\n  border-top: 1px solid #E1E1E1; }\n\n\n/* Clearing\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n\n/* Self Clearing Goodness */\n.container:after,\n.row:after,\n.u-cf {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n\n/* Media Queries\n–––––––––––––––––––––––––––––––––––––––––––––––––– */\n/*\nNote: The best way to structure the use of media queries is to create the queries\nnear the relevant code. For example, if you wanted to change the styles for buttons\non small devices, paste the mobile query code up in the buttons section and style it\nthere.\n*/\n\n\n/* Larger than mobile */\n@media (min-width: 400px) {}\n\n/* Larger than phablet (also point when grid becomes active) */\n@media (min-width: 550px) {}\n\n/* Larger than tablet */\n@media (min-width: 750px) {}\n\n/* Larger than desktop */\n@media (min-width: 1000px) {}\n\n/* Larger than Desktop HD */\n@media (min-width: 1200px) {}\n", ""]);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map