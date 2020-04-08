interface JQuery {
  zTree: IzTree;
}

interface IJSON {
  [key: string]: any
}

interface ITreeNode {
  checked?: boolean;
  children?: Array<ITreeNode>;
  chkDisabled?: boolean;
  click?: CallBackOnFn;
  getCheckStatus?: () => object;
  getIndex?: () => number;
  getNextNode?: () => ITreeNode;
  getParentNode?: () => ITreeNode;
  getPath?: () => Array<ITreeNode>;
  getPrevNode?: () => ITreeNode;
  halfCheck?: boolean;
  icon?: string;
  iconClose?: string;
  iconOpen?: string;
  iconSkin?: string;
  isHidden?: boolean;
  isParent?: boolean;
  name?: string;
  nocheck?: boolean;
  open?: boolean;
  target?: string;
  url?: string;
  check_Child_State?: number;
  check_Focus?: boolean;
  checkedOld?: boolean;
  editNameFlag?: boolean;
  isAjaxing?: boolean;
  isFirstNode?: boolean;
  isHover?: boolean;
  isLastNode?: boolean;
  level?: number;
  parentTId?: string;
  tId?: string;
  [key: string]: any;
}

type ApplicationType = 'application/x-www-form-urlencoded' | 'application/json';
type AjaxType = 'get' | 'post';
type DataType = 'text' | 'json' | 'jsonp' | 'html' | 'xml' | 'script';

/**
 * Defines a class to be returned by the zTree view.nodeClasses function
 */
interface INodeClasses
{
	add: string[];
	remove: string[];
}

interface IAsync {
  autoParam?: string[];
  contentType?: ApplicationType;
  dataFilter?: (treeId: string, parentNode: ITreeNode, responseData: IJSON[] | IJSON | string) => IJSON[] | IJSON;
  dataType?: DataType;
  enable?: boolean;
  otherParam?: string[] | IJSON;
  type?: AjaxType;
  headers?: object;
  xhrFields?: object;
  url: ((treeId: string, treeNode: ITreeNode) => string) | string;
}


type CallBackBeforeFn = (treeId: string, treeNode: ITreeNode) => boolean | Promise<boolean>;
type CallBackOnFn = (event: Event, treeId: string, treeNode: ITreeNode) => void | Promise<void>;

interface ICallback {
  beforeAsync?: CallBackBeforeFn;
  beforeCheck?: CallBackBeforeFn;
  beforeClick?: (treeId: string, treeNode: ITreeNode, clickFlag: number) => boolean | Promise<boolean>;
  beforeCollapse?: CallBackBeforeFn;
  beforeDblClick?: CallBackBeforeFn;
  beforeDrag?: (treeId: string, treeNode: ITreeNode[]) => boolean | Promise<boolean>;
  beforeDragOpen?: CallBackBeforeFn;
  beforeDrop?: (treeId: string, treeNode: ITreeNode[], targetNode: object, moveType: string, isCopy: boolean) => boolean | Promise<boolean>;
  beforeEditName?: CallBackBeforeFn;
  beforeExpand?: CallBackBeforeFn;
  beforeMouseDown?: CallBackBeforeFn;
  beforeMouseUp?: CallBackBeforeFn;
  beforeRemove?: CallBackBeforeFn;
  beforeRename?: (treeId: string, treeNode: ITreeNode, newName: string, isCancel: boolean) => boolean | Promise<boolean>;
  beforeRightClick?: CallBackBeforeFn;

  onAsyncError?: (event: Event, treeId: string, treeNode: ITreeNode, XMLHttpRequest: any, textStatus: string, errorThrown: string) => void | Promise<void>;
  onAsyncSuccess?: (event: Event, treeId: string, treeNode: ITreeNode, msg: string | object) => void | Promise<void>;
  onCheck?: (event: Event, treeId: string, treeNode: ITreeNode) => void | Promise<void>;
  onClick?: (event: Event, treeId: string, treeNode: ITreeNode, clickFlag: number) => void | Promise<void>;
  onCollapse?: (event: Event, treeId: string, treeNode: ITreeNode) => void | Promise<void>;
  onDblClick?: (event: Event, treeId: string, treeNode: ITreeNode) => void | Promise<void>;
  onDrag?: (event: Event, treeId: string, treeNodes: ITreeNode[]) => void | Promise<void>;
  onDragMove?: (event: Event, treeId: string, treeNodes: ITreeNode[]) => void | Promise<void>;
  onDrop?: (event: Event, treeId: string, treeNodes: ITreeNode[], targetNode: object, moveType: string, isCopy: boolean) => void | Promise<void>;
  onExpand?: CallBackOnFn;
  onMouseDown?: CallBackOnFn;
  onMouseUp?: CallBackOnFn;
  onNodeCreated?: CallBackOnFn;
  onRemove?: CallBackOnFn;
  onRename?: (event: Event, treeId: string, treeNode: ITreeNode, isCancel: boolean) => void | Promise<void>;
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


type removeFnType<T> = (treeId: string, treeNode: ITreeNode) => T;

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


type dblClickExpandFn<T> = (treeId: string, treeNode: ITreeNode) => T;

interface IView {
  addDiyDom?: dblClickExpandFn<void>;
  addHoverDom?: dblClickExpandFn<void>;
  autoCancelSelected?: boolean;
  dblClickExpand?: boolean | dblClickExpandFn<boolean>;
  expandSpeed?: string | number;
  fontCss?: IJSON | dblClickExpandFn<IJSON>;
  nodeClasses?: INodeClasses | dblClickExpandFn<INodeClasses>;
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


type filterFnType = (node: ITreeNode) => boolean;

interface IzTreeObj {
  setting: ISetting;
  addNodes: (parentNode: object, index?: number, newNodes?: ITreeNode[] | ITreeNode, isSilentBoolean?: boolean) => ITreeNode[];
  cancelEditName: (newName?: string) => void;
  cancelSelectedNode: (treeNode?: ITreeNode) => void;
  checkAllNodes: (checked: boolean) => void;
  checkNode: (treeNode: ITreeNode, checked?: boolean, checkTypeFlag?: boolean, callbackFlag?: boolean) => void;
  copyNode: (targetNode: object, treeNode: ITreeNode, moveType: string, isSilent: boolean) => ITreeNode;
  destroy: () => void;
  editName: (treeNode: ITreeNode) => void;
  expandAll: (expandFlag: boolean) => boolean | null;
  expandNode: (treeNode: ITreeNode, expandFlag?: boolean, sonSign?: boolean, focus?: boolean, callbackFlag?: boolean) => boolean | null;
  getChangeCheckedNodes: () => ITreeNode[];
  getCheckedNodes: (checked?: boolean) => ITreeNode[];
  getNodeByParam: (key: string, value: any, parentNode?: object) => object;
  getNodeByTId: (tId: string) => ITreeNode;
  getNodeIndex: (treeNode: ITreeNode) => number;
  getNodes: () => ITreeNode[];
  getNodesByFilter: (filter: filterFnType, isSingle?: boolean, parentNode?: ITreeNode, invokeParam?: any) => any;
  getNodesByParam: (key: string, value: any, parentNode?: object) => object;
  getNodesByParamFuzzy: (key: string, value: string, parentNode?: object) => object;
  getSelectedNodes: (isTure: boolean) => any;
  hideNode: (treeNode: ITreeNode) => void;
  hideNodes: (treeNodes: ITreeNode[]) => void;
  moveNode: (targetNode: object, treeNode: ITreeNode, moveType: string, isSilent?: boolean) => ITreeNode;
  reAsyncChildNodes: (parentNode: ITreeNode, reloadType: string, isSilent?: boolean, callback?: any) => void;
  reAsyncChildNodesPromise: (parentNode: ITreeNode, reloadType: string, isSilent?: boolean) => any; // ps: return Promise object
  refresh: () => void;
  removeChildNodes: (parentNode: ITreeNode) => ITreeNode[];
  removeNode: (treeNode: ITreeNode, callbackFlag?: boolean) => void;
  selectNode: (treeNode: ITreeNode, addFlag?: boolean, isSilent?: boolean) => void;
  setChkDisabled: (treeNode: ITreeNode, disabled?: boolean, inheritParent?: boolean, inheritChildren?: boolean) => void;
  setEditable: (editable: boolean) => void;
  showNode: (treeNode: ITreeNode) => void;
  showNodes: (treeNodes: ITreeNode[]) => void;
  transformToArray: (treeNodes: ITreeNode[] | ITreeNode) => ITreeNode[];
  transformTozTreeNodes: (simpleNodes: ITreeNode[] | ITreeNode) => ITreeNode[];
  updateNode: (treeNode: ITreeNode, checkTypeFlag?: boolean) => void;
  updateNodeIconSkin: (treeNode: ITreeNode) => void;
}

interface IzTree {
  init?: (dom: any, setting: ISetting, zNodes: ITreeNode[] | object) => IzTreeObj;
  getZTreeObj?: (treeId: string) => IzTreeObj;
  destroy?: (treeId: string) => void;
  _z?: any;
}