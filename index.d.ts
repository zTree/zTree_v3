
interface JQuery {
  zTree: IzTree;
}

interface IJSON { 
  [key: string]: any
}


type ApplicationType = 'application/x-www-form-urlencoded' | 'application/json';
type AjaxType = 'get' | 'post';
type dataType = 'text' | 'json' | 'jsonp' | 'html' | 'xml' | 'script';

interface IAsync {
  autoParam?: string[];
  contentType?: ApplicationType;
  dataFilter?: (treeId: string, parentNode: object, responseData: IJSON[] | IJSON | string) => IJSON[] | IJSON;
  dataType?: dataType;
  enable?: boolean;
  otherParam?: string[] | IJSON;
  type?: AjaxType;
  headers?: object;
  xhrFields?: object;
  url: string;
}


type CallBackBeforeFn = (treeId: string, treeNode: object) => boolean;
type CallBackOnFn = (event: Event, treeId: string, treeNode: IJSON) => void;

interface ICallback {
  beforeAsync?: CallBackBeforeFn;
  beforeCheck?: CallBackBeforeFn;
  beforeClick?: (treeId: string, treeNode: object, clickFlag: number) => boolean;
  beforeCollapse?: CallBackBeforeFn;
  beforeDblClick?: CallBackBeforeFn;
  beforeDrag?: (treeId: string, treeNode: IJSON[]) => boolean;
  beforeDragOpen?: CallBackBeforeFn;
  beforeDrop?: (treeId: string, treeNode: IJSON[], targetNode: object, moveType: string, isCopy: boolean) => boolean;
  beforeEditName?: CallBackBeforeFn;
  beforeExpand?: CallBackBeforeFn;
  beforeMouseDown?: CallBackBeforeFn;
  beforeMouseUp?: CallBackBeforeFn;
  beforeRemove?: CallBackBeforeFn;
  beforeRename?: (treeId: string, treeNode: object, newName: string, isCancel: boolean) => boolean;
  beforeRightClick?: CallBackBeforeFn;

  onAsyncError?: (event: Event, treeId: string, treeNode: object, XMLHttpRequest: any, textStatus: string, errorThrown: string) => void;
  onAsyncSuccess?: (event: Event, treeId: string, treeNode: object, msg: string | object) => void;
  onCheck?: (event: Event, treeId: string, treeNode: object) => void;
  onClick?: (event: Event, treeId: string, treeNode: object, clickFlag: number) => void;
  onCollapse?: (event: Event, treeId: string, treeNode: object) => void;
  onDblClick?: (event: Event, treeId: string, treeNode: object) => void;
  onDrag?: (event: Event, treeId: string, treeNodes: IJSON[]) => void;
  onDragMove?: (event: Event, treeId: string, treeNodes: IJSON[]) => void;
  onDrop?: (event: Event, treeId: string, treeNodes: IJSON[], targetNode: object, moveType: string, isCopy: boolean) => void;
  onExpand?: CallBackOnFn;
  onMouseDown?: CallBackOnFn;
  onMouseUp?: CallBackOnFn;
  onNodeCreated?: CallBackOnFn;
  onRemove?: CallBackOnFn;
  onRename?: (event: Event, treeId: string, treeNode: IJSON, isCancel: boolean) => void;
  onRightClick?: CallBackOnFn;
}

interface ICheck {
  autoCheckTrigger?: boolean;
  chkboxType?: IJSON;
  chkStyle?: string;
  enable?: boolean;
  nocheckInherit?: boolean;
  chkDisabledInherit?: boolean;
  radioType?: string;
}

interface IData {
  keep?: {
    leaf?: boolean;
    parent?: boolean;
  },
  key?: {
    checked?: string;
    children?: string;
    isParent?: string;
    isHidden?: string;
    name?: string;
    title?: string;
    url?: string;
  },
  simpleData?: {
    enable?: boolean;
    idKey?: string;
    pIdKey?: string;
    rootPId?: any;
  }
}


type removeFnType<T> = (treeId: string, treeNode: object) => T;

interface IEdit {
  drag?: {
    autoExpandTrigger?: boolean;
    isCopy?: boolean;
    isMove?: boolean;
    prev?: boolean;
    next?: boolean;
    inner?: boolean;
    borderMax?: number;
    borderMin?: number;
    minMoveSize?: number;
    maxShowNodeNum?: number;
    autoOpenTime?: number;
  },
  editNameSelectAll?: boolean;
  enable?: boolean;
  removeTitle?: string | removeFnType<string>;
  renameTitle?: string | removeFnType<string>;
  showRemoveBtn?: boolean | removeFnType<boolean>;
  showRenameBtn?: boolean | removeFnType<boolean>;
}


type dblClickExpandFn<T> = (treeId: string, treeNode: object) => T;

interface IView {
  addDiyDom?: dblClickExpandFn<void>;
  addHoverDom?: dblClickExpandFn<void>;
  autoCancelSelected?: boolean;
  dblClickExpand?: boolean | dblClickExpandFn<boolean>;
  expandSpeed?: string | number;
  fontCss?: IJSON | dblClickExpandFn<IJSON>;
  nameIsHTML?: boolean;
  removeHoverDom?: dblClickExpandFn<void>;
  selectedMulti?: boolean;
  showIcon?: boolean | dblClickExpandFn<boolean>;
  showLine?: boolean;
  showTitle?: boolean | dblClickExpandFn<boolean>;
  txtSelectedEnable?: boolean;
}

interface ISetting {
  async?: IAsync;
  callback?: ICallback;
  check?: ICheck;
  data?: IData;
  edit?: IEdit;
  view?: IView;
}


type filterFnType = (node: IJSON) => boolean;

interface IzTreeObj {
  setting: ISetting;
  addNodes: (parentNode: object, index?: number, newNodes?: IJSON[] | IJSON, isSilentBoolean?: boolean) => IJSON[];
  cancelEditName: (newName?: string) => void;
  cancelSelectedNode: (treeNode?: object) => void;
  checkAllNodes: (checked: boolean) => void;
  checkNode: (treeNode: IJSON, checked?: boolean, checkTypeFlag?: boolean, callbackFlag?: boolean) => void;
  copyNode: (targetNode: object, treeNode: IJSON, moveType: string, isSilent: boolean) => IJSON;
  destroy: () => void;
  editName: (treeNode: IJSON) => void;
  expandAll: (expandFlag: boolean) => boolean | null;
  expandNode: (treeNode: IJSON, expandFlag?: boolean, sonSign?: boolean, focus?: boolean, callbackFlag?: boolean) => boolean | null;
  getChangeCheckedNodes: () => IJSON[];
  getCheckedNodes: (checked?: boolean) => IJSON[];
  getNodeByParam: (key: string, value: any, parentNode?: object) => object;
  getNodeByTId: (tId: string) => object;
  getNodeIndex: (treeNode: IJSON) => number;
  getNodes: () => IJSON[];
  getNodesByFilter: (filter: filterFnType, isSingle?: boolean, parentNode?: IJSON, invokeParam?: any) => object;
  getNodesByParam: (key: string, value: any, parentNode?: object) => object;
  getNodesByParamFuzzy: (key: string, value: string, parentNode?: object) => object;
  getSelectedNodes: () => any;
  hideNode: (treeNode: IJSON) => void;
  hideNodes: (treeNodes: IJSON[]) => void;
  moveNode: (targetNode: object, treeNode: IJSON, moveType: string, isSilent?: boolean) => IJSON;
  reAsyncChildNodes: (parentNode: IJSON, reloadType: string, isSilent?: boolean, callback?: any) => void;
  reAsyncChildNodesPromise: (parentNode: IJSON, reloadType: string, isSilent?: boolean) => any; // ps: return Promise object
  refresh: () => void;
  removeChildNodes: (parentNode: IJSON) => IJSON[];
  removeNode: (treeNode: IJSON, callbackFlag?: boolean) => void;
  selectNode: (treeNode: IJSON, addFlag?: boolean, isSilent?: boolean) => void;
  setChkDisabled: (treeNode: IJSON, disabled?: boolean, inheritParent?: boolean, inheritChildren?: boolean) => void;
  setEditable: (editable: boolean) => void;
  showNode: (treeNode: IJSON) => void;
  showNodes: (treeNodes: IJSON[]) => void;
  transformToArray: (treeNodes: IJSON[] | IJSON) => IJSON[];
  transformTozTreeNodes: (simpleNodes: IJSON[] | IJSON) => IJSON[];
  updateNode: (treeNode: IJSON, checkTypeFlag?: boolean) => void;
}

interface IzTree {
  init?: (dom: any, setting: ISetting, zNodes: IJSON[] | object) => IzTreeObj;
  getZTreeObj?: (treeId: string) => IzTreeObj;
  destroy?: (treeId: string) => void;
  _z?: any;
}
