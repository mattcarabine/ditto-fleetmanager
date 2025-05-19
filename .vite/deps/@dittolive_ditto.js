import "./chunk-5WRI5ZAA.js";

// node_modules/@dittolive/ditto/web/ditto.es6.js
var KeepAlive = class _KeepAlive {
  get isActive() {
    return null !== this.intervalID;
  }
  constructor() {
    this.countsByID = {}, this.intervalID = null;
  }
  retain(e) {
    if (void 0 === this.countsByID[e] && (this.countsByID[e] = 0), this.countsByID[e] += 1, null === this.intervalID) {
      const e2 = 2147483647;
      this.intervalID = setInterval(() => {
      }, e2), _KeepAlive.finalizationRegistry.register(this, this.intervalID, this);
    }
  }
  release(e) {
    if (void 0 === this.countsByID[e]) throw new Error(`Internal inconsistency, trying to release a keep-alive ID that hasn't been retained before or isn't tracked anymore: ${e}`);
    this.countsByID[e] -= 1, 0 === this.countsByID[e] && delete this.countsByID[e], 0 === Object.keys(this.countsByID).length && (_KeepAlive.finalizationRegistry.unregister(this), clearInterval(this.intervalID), this.intervalID = null);
  }
  currentIDs() {
    return Object.keys(this.countsByID);
  }
  countForID(e) {
    var t;
    return null !== (t = this.countsByID[e]) && void 0 !== t ? t : null;
  }
};
KeepAlive.finalizationRegistry = new FinalizationRegistry(clearInterval);
var Observer = class _Observer {
  get token() {
    return this._token;
  }
  constructor(e, t, n = {}) {
    this.observerManager = e, this._token = t, this.options = n, n.stopsWhenFinalized && _Observer.finalizationRegistry.register(this, { observerManager: e, token: t }, this);
  }
  get isStopped() {
    return void 0 !== this.token && this.observerManager.hasObserver(this.token);
  }
  stop() {
    const e = this.token;
    e && (delete this._token, _Observer.finalizationRegistry.unregister(this), this.observerManager.removeObserver(e));
  }
  static finalize(e) {
    const { observerManager: t, token: n } = e;
    t.removeObserver(n);
  }
};
Observer.finalizationRegistry = new FinalizationRegistry(Observer.finalize);
var privateToken$1 = Symbol("privateConstructorToken");
var Counter = class _Counter {
  get value() {
    return this._value;
  }
  constructor() {
    this._value = 0;
  }
  static "@ditto.create"(e, t, n) {
    const r = e ? new MutableCounter(privateToken$1) : new _Counter();
    return r.mutDoc = e, r.path = t, r._value = n, r;
  }
};
var MutableCounter = class extends Counter {
  increment(e) {
    const t = this.mutDoc, n = this.path;
    if (!t) throw new Error("Can't increment counter, only possible within the closure of a collection's update() method.");
    t.at(n)["@ditto.increment"](e), this._value += e;
  }
  constructor() {
    if (arguments[0] !== privateToken$1) throw new Error("MutableCounter constructor is for internal use only.");
    super();
  }
};
var privateToken = "@ditto.ff82dae89821c5ab822a8b539056bce4";
var Register = class _Register {
  get value() {
    return this["@ditto.value"];
  }
  constructor(e) {
    this["@ditto.value"] = e;
  }
  static "@ditto.create"(e, t, n) {
    const r = e ? new MutableRegister(n, privateToken) : new _Register(n);
    return r["@ditto.mutableDocument"] = e, r["@ditto.path"] = t, r["@ditto.value"] = n, r;
  }
};
var MutableRegister = class extends Register {
  get value() {
    return super.value;
  }
  set value(e) {
    this.set(e);
  }
  set(e) {
    const t = this["@ditto.mutableDocument"], n = this["@ditto.path"];
    t.at(n)["@ditto.set"](e), this["@ditto.value"] = e;
  }
  constructor(e) {
    if (arguments[1] !== privateToken) throw new Error("MutableRegister constructor is for internal use only.");
    super(e);
  }
};
function to_string(e) {
  return e.toString();
}
function is_number(e) {
  return "number" == typeof e;
}
function try_downsize(e) {
  switch (typeof e) {
    case "bigint":
      if (-Number.MAX_SAFE_INTEGER <= e && e <= Number.MAX_SAFE_INTEGER) return Number(e);
    case "number":
      return e;
    default:
      throw new Error(`number or bigint expected, got \`${e}\``);
  }
}
function from_string(e) {
  return BigInt(e);
}
var __wbg_star0 = Object.freeze({ __proto__: null, from_string, is_number, to_string, try_downsize });
function get_element(e, t) {
  return e[t];
}
function typeof_(e) {
  return typeof e;
}
function mk_send_ret() {
  return function send_ret(e) {
    return e;
  };
}
var __wbg_star1 = Object.freeze({ __proto__: null, mk_send_ret });
var wasm;
var cachedTextDecoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
"undefined" != typeof TextDecoder && cachedTextDecoder.decode();
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  return null !== cachedUint8ArrayMemory0 && 0 !== cachedUint8ArrayMemory0.byteLength || (cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer)), cachedUint8ArrayMemory0;
}
function getStringFromWasm0(e, t) {
  return e >>>= 0, cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(e, e + t));
}
function addToExternrefTable0(e) {
  const t = wasm.__externref_table_alloc();
  return wasm.__wbindgen_export_2.set(t, e), t;
}
function handleError(e, t) {
  try {
    return e.apply(this, t);
  } catch (e2) {
    const t2 = addToExternrefTable0(e2);
    wasm.__wbindgen_exn_store(t2);
  }
}
var WASM_VECTOR_LEN = 0;
var cachedTextEncoder = "undefined" != typeof TextEncoder ? new TextEncoder("utf-8") : { encode: () => {
  throw Error("TextEncoder not available");
} };
var encodeString = "function" == typeof cachedTextEncoder.encodeInto ? function(e, t) {
  return cachedTextEncoder.encodeInto(e, t);
} : function(e, t) {
  const n = cachedTextEncoder.encode(e);
  return t.set(n), { read: e.length, written: n.length };
};
function passStringToWasm0(e, t, n) {
  if (void 0 === n) {
    const n2 = cachedTextEncoder.encode(e), r2 = t(n2.length, 1) >>> 0;
    return getUint8ArrayMemory0().subarray(r2, r2 + n2.length).set(n2), WASM_VECTOR_LEN = n2.length, r2;
  }
  let r = e.length, i = t(r, 1) >>> 0;
  const o = getUint8ArrayMemory0();
  let a = 0;
  for (; a < r; a++) {
    const t2 = e.charCodeAt(a);
    if (t2 > 127) break;
    o[i + a] = t2;
  }
  if (a !== r) {
    0 !== a && (e = e.slice(a)), i = n(i, r, r = a + 3 * e.length, 1) >>> 0;
    const t2 = getUint8ArrayMemory0().subarray(i + a, i + r);
    a += encodeString(e, t2).written, i = n(i, r, a, 1) >>> 0;
  }
  return WASM_VECTOR_LEN = a, i;
}
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  return (null === cachedDataViewMemory0 || true === cachedDataViewMemory0.buffer.detached || void 0 === cachedDataViewMemory0.buffer.detached && cachedDataViewMemory0.buffer !== wasm.memory.buffer) && (cachedDataViewMemory0 = new DataView(wasm.memory.buffer)), cachedDataViewMemory0;
}
function getArrayU8FromWasm0(e, t) {
  return e >>>= 0, getUint8ArrayMemory0().subarray(e / 1, e / 1 + t);
}
function isLikeNone(e) {
  return null == e;
}
var CLOSURE_DTORS = "undefined" == typeof FinalizationRegistry ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => {
  wasm.__wbindgen_export_6.get(e.dtor)(e.a, e.b);
});
function makeMutClosure(e, t, n, r) {
  const i = { a: e, b: t, cnt: 1, dtor: n }, real = (...e2) => {
    i.cnt++;
    const t2 = i.a;
    i.a = 0;
    try {
      return r(t2, i.b, ...e2);
    } finally {
      0 == --i.cnt ? (wasm.__wbindgen_export_6.get(i.dtor)(t2, i.b), CLOSURE_DTORS.unregister(i)) : i.a = t2;
    }
  };
  return real.original = i, CLOSURE_DTORS.register(real, i, i), real;
}
function debugString(e) {
  const t = typeof e;
  if ("number" == t || "boolean" == t || null == e) return `${e}`;
  if ("string" == t) return `"${e}"`;
  if ("symbol" == t) {
    const t2 = e.description;
    return null == t2 ? "Symbol" : `Symbol(${t2})`;
  }
  if ("function" == t) {
    const t2 = e.name;
    return "string" == typeof t2 && t2.length > 0 ? `Function(${t2})` : "Function";
  }
  if (Array.isArray(e)) {
    const t2 = e.length;
    let n2 = "[";
    t2 > 0 && (n2 += debugString(e[0]));
    for (let r2 = 1; r2 < t2; r2++) n2 += ", " + debugString(e[r2]);
    return n2 += "]", n2;
  }
  const n = /\[object ([^\]]+)\]/.exec(toString.call(e));
  let r;
  if (!(n && n.length > 1)) return toString.call(e);
  if (r = n[1], "Object" == r) try {
    return "Object(" + JSON.stringify(e) + ")";
  } catch (e2) {
    return "Object";
  }
  return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : r;
}
function takeFromExternrefTable0(e) {
  const t = wasm.__wbindgen_export_2.get(e);
  return wasm.__externref_table_dealloc(e), t;
}
function dittoffi_try_remove_sync_subscription(e, t, n) {
  const r = wasm.dittoffi_try_remove_sync_subscription(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function dittoffi_try_add_sync_subscription(e, t, n) {
  const r = wasm.dittoffi_try_add_sync_subscription(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function ditto_add_subscription(e, t, n, r, i, o, a) {
  const s = wasm.ditto_add_subscription(e, t, n, r, i, o, a);
  if (s[2]) throw takeFromExternrefTable0(s[1]);
  return takeFromExternrefTable0(s[0]);
}
function ditto_remove_subscription(e, t, n, r, i, o, a) {
  const s = wasm.ditto_remove_subscription(e, t, n, r, i, o, a);
  if (s[2]) throw takeFromExternrefTable0(s[1]);
  return takeFromExternrefTable0(s[0]);
}
function dittoffi_query_result_mutated_document_id_at(e, t) {
  const n = wasm.dittoffi_query_result_mutated_document_id_at(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function dittoffi_query_result_mutated_document_id_count(e) {
  const t = wasm.dittoffi_query_result_mutated_document_id_count(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_query_result_item_at(e, t) {
  const n = wasm.dittoffi_query_result_item_at(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function dittoffi_query_result_item_count(e) {
  const t = wasm.dittoffi_query_result_item_count(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_query_result_free(e) {
  const t = wasm.dittoffi_query_result_free(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_query_result_item_free(e) {
  const t = wasm.dittoffi_query_result_item_free(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_query_result_item_json(e) {
  const t = wasm.dittoffi_query_result_item_json(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_query_result_item_cbor(e) {
  const t = wasm.dittoffi_query_result_item_cbor(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_log(e, t) {
  const n = wasm.ditto_log(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_logger_minimum_log_level_get() {
  const e = wasm.ditto_logger_minimum_log_level_get();
  if (e[2]) throw takeFromExternrefTable0(e[1]);
  return takeFromExternrefTable0(e[0]);
}
function ditto_logger_minimum_log_level(e) {
  const t = wasm.ditto_logger_minimum_log_level(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_logger_emoji_headings_enabled_get() {
  const e = wasm.ditto_logger_emoji_headings_enabled_get();
  if (e[2]) throw takeFromExternrefTable0(e[1]);
  return takeFromExternrefTable0(e[0]);
}
function ditto_logger_emoji_headings_enabled(e) {
  const t = wasm.ditto_logger_emoji_headings_enabled(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_logger_enabled_get() {
  const e = wasm.ditto_logger_enabled_get();
  if (e[2]) throw takeFromExternrefTable0(e[1]);
  return takeFromExternrefTable0(e[0]);
}
function ditto_logger_enabled(e) {
  const t = wasm.ditto_logger_enabled(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_logger_init() {
  const e = wasm.ditto_logger_init();
  if (e[2]) throw takeFromExternrefTable0(e[1]);
  return takeFromExternrefTable0(e[0]);
}
function ditto_logger_set_log_file(e) {
  const t = wasm.ditto_logger_set_log_file(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_logger_try_export_to_file_async(e, t) {
  const n = wasm.dittoffi_logger_try_export_to_file_async(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_logger_set_custom_log_cb(e) {
  const t = wasm.ditto_logger_set_custom_log_cb(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_auth_client_logout(e) {
  const t = wasm.ditto_auth_client_logout(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_connection_request_authorize(e, t) {
  const n = wasm.dittoffi_connection_request_authorize(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function dittoffi_connection_request_connection_type(e) {
  const t = wasm.dittoffi_connection_request_connection_type(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_connection_request_peer_key_string(e) {
  const t = wasm.dittoffi_connection_request_peer_key_string(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_connection_request_identity_service_metadata_json(e) {
  const t = wasm.dittoffi_connection_request_identity_service_metadata_json(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_connection_request_peer_metadata_json(e) {
  const t = wasm.dittoffi_connection_request_peer_metadata_json(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_connection_request_free(e) {
  const t = wasm.dittoffi_connection_request_free(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_presence_peer_metadata_json(e) {
  const t = wasm.dittoffi_presence_peer_metadata_json(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_presence_try_set_peer_metadata_json(e, t) {
  const n = wasm.dittoffi_presence_try_set_peer_metadata_json(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_auth_client_login_with_credentials(e, t, n, r) {
  const i = wasm.ditto_auth_client_login_with_credentials(e, t, n, r);
  if (i[2]) throw takeFromExternrefTable0(i[1]);
  return takeFromExternrefTable0(i[0]);
}
function ditto_auth_client_login_with_token(e, t, n) {
  const r = wasm.ditto_auth_client_login_with_token(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function ditto_auth_client_login_with_token_and_feedback(e, t, n) {
  const r = wasm.ditto_auth_client_login_with_token_and_feedback(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function ditto_auth_client_is_web_valid(e) {
  const t = wasm.ditto_auth_client_is_web_valid(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_auth_client_user_id(e) {
  const t = wasm.ditto_auth_client_user_id(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_auth_client_get_app_id(e) {
  const t = wasm.ditto_auth_client_get_app_id(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_auth_client_get_site_id(e) {
  const t = wasm.ditto_auth_client_get_site_id(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_auth_set_login_provider(e, t) {
  const n = wasm.ditto_auth_set_login_provider(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_identity_config_make_manual_v0(e) {
  const t = wasm.ditto_identity_config_make_manual_v0(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_identity_config_make_shared_key(e, t, n) {
  const r = wasm.ditto_identity_config_make_shared_key(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function ditto_identity_config_make_offline_playground(e, t) {
  const n = wasm.ditto_identity_config_make_offline_playground(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_identity_config_make_online_playground(e, t, n) {
  const r = wasm.ditto_identity_config_make_online_playground(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function ditto_identity_config_make_online_with_authentication(e, t) {
  const n = wasm.ditto_identity_config_make_online_with_authentication(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function dittoffi_presence_set_connection_request_handler(e, t) {
  const n = wasm.dittoffi_presence_set_connection_request_handler(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_auth_client_make_login_provider(e) {
  const t = wasm.ditto_auth_client_make_login_provider(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_authentication_status_free(e) {
  const t = wasm.dittoffi_authentication_status_free(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_authentication_status_is_authenticated(e) {
  const t = wasm.dittoffi_authentication_status_is_authenticated(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_authentication_status_user_id(e) {
  const t = wasm.dittoffi_authentication_status_user_id(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_ditto_transport_config(e) {
  const t = wasm.dittoffi_ditto_transport_config(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_ditto_try_set_transport_config(e, t, n) {
  const r = wasm.dittoffi_ditto_try_set_transport_config(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function dittoffi_ditto_is_sync_active(e) {
  const t = wasm.dittoffi_ditto_is_sync_active(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_ditto_stop_sync(e) {
  const t = wasm.dittoffi_ditto_stop_sync(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_ditto_try_start_sync(e) {
  const t = wasm.dittoffi_ditto_try_start_sync(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_ditto_set_authentication_status_handler(e, t) {
  const n = wasm.dittoffi_ditto_set_authentication_status_handler(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function dittoffi_try_verify_license(e, t) {
  const n = wasm.dittoffi_try_verify_license(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_register_presence_v1_callback(e, t) {
  const n = wasm.ditto_register_presence_v1_callback(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_register_presence_v3_callback(e, t) {
  const n = wasm.ditto_register_presence_v3_callback(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_init_sdk_version(e, t, n) {
  const r = wasm.ditto_init_sdk_version(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function dittoffi_get_sdk_semver() {
  const e = wasm.dittoffi_get_sdk_semver();
  if (e[2]) throw takeFromExternrefTable0(e[1]);
  return takeFromExternrefTable0(e[0]);
}
function ditto_get_sdk_version() {
  const e = wasm.ditto_get_sdk_version();
  if (e[2]) throw takeFromExternrefTable0(e[1]);
  return takeFromExternrefTable0(e[0]);
}
function ditto_disable_sync_with_v3(e) {
  const t = wasm.ditto_disable_sync_with_v3(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_run_garbage_collection(e) {
  const t = wasm.ditto_run_garbage_collection(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_set_device_name(e, t) {
  const n = wasm.ditto_set_device_name(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_presence_v3(e) {
  const t = wasm.ditto_presence_v3(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_presence_v1(e) {
  const t = wasm.ditto_presence_v1(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_clear_presence_v3_callback(e) {
  const t = wasm.ditto_clear_presence_v3_callback(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_clear_presence_callback(e) {
  const t = wasm.ditto_clear_presence_callback(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_ditto_is_activated(e) {
  const t = wasm.dittoffi_ditto_is_activated(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_ditto_set_cloud_sync_enabled(e, t) {
  const n = wasm.dittoffi_ditto_set_cloud_sync_enabled(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_free(e) {
  const t = wasm.ditto_free(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_shutdown(e) {
  const t = wasm.ditto_shutdown(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_make_with_transport_config_mode(e, t, n, r) {
  const i = wasm.dittoffi_make_with_transport_config_mode(e, t, n, r);
  if (i[2]) throw takeFromExternrefTable0(i[1]);
  return takeFromExternrefTable0(i[0]);
}
function ditto_register_transport_condition_changed_callback(e, t) {
  const n = wasm.ditto_register_transport_condition_changed_callback(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function dittoffi_error_description(e) {
  const t = wasm.dittoffi_error_description(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_error_code(e) {
  const t = wasm.dittoffi_error_code(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function dittoffi_error_free(e) {
  const t = wasm.dittoffi_error_free(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_validate_document_id(e, t) {
  const n = wasm.ditto_validate_document_id(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_document_id_query_compatible(e, t) {
  const n = wasm.ditto_document_id_query_compatible(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_error_message() {
  const e = wasm.ditto_error_message();
  if (e[2]) throw takeFromExternrefTable0(e[1]);
  return takeFromExternrefTable0(e[0]);
}
function dittoffi_try_base64_decode(e, t) {
  const n = wasm.dittoffi_try_base64_decode(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function dittoffi_base64_encode(e, t) {
  const n = wasm.dittoffi_base64_encode(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function dittoffi_try_exec_statement(e, t, n) {
  const r = wasm.dittoffi_try_exec_statement(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function dittoffi_crypto_generate_secure_random_token() {
  const e = wasm.dittoffi_crypto_generate_secure_random_token();
  if (e[2]) throw takeFromExternrefTable0(e[1]);
  return takeFromExternrefTable0(e[0]);
}
function ditto_small_peer_info_get_sync_scope(e) {
  const t = wasm.ditto_small_peer_info_get_sync_scope(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_small_peer_info_set_sync_scope(e, t) {
  const n = wasm.ditto_small_peer_info_set_sync_scope(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_small_peer_info_get_is_enabled(e) {
  const t = wasm.ditto_small_peer_info_get_is_enabled(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_small_peer_info_set_enabled(e, t) {
  const n = wasm.ditto_small_peer_info_set_enabled(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_small_peer_info_get_metadata(e) {
  const t = wasm.ditto_small_peer_info_get_metadata(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_small_peer_info_set_metadata(e, t) {
  const n = wasm.ditto_small_peer_info_set_metadata(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_collection_get_with_write_transaction(e, t, n, r) {
  const i = wasm.ditto_collection_get_with_write_transaction(e, t, n, r);
  if (i[2]) throw takeFromExternrefTable0(i[1]);
  return takeFromExternrefTable0(i[0]);
}
function ditto_collection_get(e, t, n, r) {
  const i = wasm.ditto_collection_get(e, t, n, r);
  if (i[2]) throw takeFromExternrefTable0(i[1]);
  return takeFromExternrefTable0(i[0]);
}
function ditto_collection_remove(e, t, n, r) {
  const i = wasm.ditto_collection_remove(e, t, n, r);
  if (i[2]) throw takeFromExternrefTable0(i[1]);
  return takeFromExternrefTable0(i[0]);
}
function ditto_collection_evict(e, t, n, r) {
  const i = wasm.ditto_collection_evict(e, t, n, r);
  if (i[2]) throw takeFromExternrefTable0(i[1]);
  return takeFromExternrefTable0(i[0]);
}
function ditto_collection_update_multiple(e, t, n, r) {
  const i = wasm.ditto_collection_update_multiple(e, t, n, r);
  if (i[2]) throw takeFromExternrefTable0(i[1]);
  return takeFromExternrefTable0(i[0]);
}
function ditto_collection_update(e, t, n, r) {
  const i = wasm.ditto_collection_update(e, t, n, r);
  if (i[2]) throw takeFromExternrefTable0(i[1]);
  return takeFromExternrefTable0(i[0]);
}
function ditto_collection_insert_value(e, t, n, r, i, o) {
  const a = wasm.ditto_collection_insert_value(e, t, n, r, i, o);
  if (a[2]) throw takeFromExternrefTable0(a[1]);
  return takeFromExternrefTable0(a[0]);
}
function ditto_get_collection_names(e) {
  const t = wasm.ditto_get_collection_names(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_documents_hash(e) {
  const t = wasm.ditto_documents_hash(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_documents_hash_mnemonic(e) {
  const t = wasm.ditto_documents_hash_mnemonic(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_collection_evict_query_str(e, t, n, r, i, o, a, s) {
  const c = wasm.ditto_collection_evict_query_str(e, t, n, r, i, o, a, s);
  if (c[2]) throw takeFromExternrefTable0(c[1]);
  return takeFromExternrefTable0(c[0]);
}
function ditto_collection_remove_query_str(e, t, n, r, i, o, a, s) {
  const c = wasm.ditto_collection_remove_query_str(e, t, n, r, i, o, a, s);
  if (c[2]) throw takeFromExternrefTable0(c[1]);
  return takeFromExternrefTable0(c[0]);
}
function ditto_collection_exec_query_str(e, t, n, r, i, o, a, s) {
  const c = wasm.ditto_collection_exec_query_str(e, t, n, r, i, o, a, s);
  if (c[2]) throw takeFromExternrefTable0(c[1]);
  return takeFromExternrefTable0(c[0]);
}
function jsDocsToCDocs(e) {
  const t = wasm.jsDocsToCDocs(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_write_transaction_rollback(e, t) {
  const n = wasm.ditto_write_transaction_rollback(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_write_transaction_commit(e, t) {
  const n = wasm.ditto_write_transaction_commit(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_write_transaction(e, t) {
  const n = wasm.ditto_write_transaction(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_read_transaction_free(e) {
  const t = wasm.ditto_read_transaction_free(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_read_transaction(e) {
  const t = wasm.ditto_read_transaction(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_live_query_signal_available_next(e, t) {
  const n = wasm.ditto_live_query_signal_available_next(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_live_query_stop(e, t) {
  const n = wasm.ditto_live_query_stop(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_live_query_start(e, t) {
  const n = wasm.ditto_live_query_start(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_live_query_register_str_detached(e, t, n, r, i, o, a, s) {
  const c = wasm.ditto_live_query_register_str_detached(e, t, n, r, i, o, a, s);
  if (c[2]) throw takeFromExternrefTable0(c[1]);
  return takeFromExternrefTable0(c[0]);
}
function dittoffi_try_experimental_register_change_observer_str_detached(e, t, n, r) {
  const i = wasm.dittoffi_try_experimental_register_change_observer_str_detached(e, t, n, r);
  if (i[2]) throw takeFromExternrefTable0(i[1]);
  return takeFromExternrefTable0(i[0]);
}
function ditto_live_query_webhook_register_str(e, t, n, r, i, o, a) {
  const s = wasm.ditto_live_query_webhook_register_str(e, t, n, r, i, o, a);
  if (s[2]) throw takeFromExternrefTable0(s[1]);
  return takeFromExternrefTable0(s[0]);
}
function ditto_document_free(e) {
  const t = wasm.ditto_document_free(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_document_get_cbor_with_path_type(e, t, n) {
  const r = wasm.ditto_document_get_cbor_with_path_type(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function ditto_document_remove(e, t) {
  const n = wasm.ditto_document_remove(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_document_set_cbor_with_timestamp(e, t, n, r) {
  const i = wasm.ditto_document_set_cbor_with_timestamp(e, t, n, r);
  if (i[2]) throw takeFromExternrefTable0(i[1]);
  return takeFromExternrefTable0(i[0]);
}
function ditto_document_set_cbor(e, t, n) {
  const r = wasm.ditto_document_set_cbor(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function ditto_document_increment_counter(e, t, n) {
  const r = wasm.ditto_document_increment_counter(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function ditto_document_id(e) {
  const t = wasm.ditto_document_id(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_cancel_resolve_attachment(e, t, n) {
  const r = wasm.ditto_cancel_resolve_attachment(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function ditto_free_attachment_handle(e) {
  const t = wasm.ditto_free_attachment_handle(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function ditto_get_complete_attachment_data(e, t) {
  const n = wasm.ditto_get_complete_attachment_data(e, t);
  if (n[2]) throw takeFromExternrefTable0(n[1]);
  return takeFromExternrefTable0(n[0]);
}
function ditto_new_attachment_from_bytes(e, t, n) {
  const r = wasm.ditto_new_attachment_from_bytes(e, t, n);
  if (r[2]) throw takeFromExternrefTable0(r[1]);
  return takeFromExternrefTable0(r[0]);
}
function ditto_resolve_attachment(e, t, n, r, i) {
  const o = wasm.ditto_resolve_attachment(e, t, n, r, i);
  if (o[2]) throw takeFromExternrefTable0(o[1]);
  return takeFromExternrefTable0(o[0]);
}
function boxCStringIntoString(e) {
  const t = wasm.boxCStringIntoString(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function refCStringToString(e) {
  const t = wasm.refCStringToString(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function boxCBytesIntoBuffer(e) {
  const t = wasm.boxCBytesIntoBuffer(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function refCBytesIntoBuffer(e) {
  const t = wasm.refCBytesIntoBuffer(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function withOutBoxCBytes(e) {
  const t = wasm.withOutBoxCBytes(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function cStringVecToStringArray(e) {
  const t = wasm.cStringVecToStringArray(e);
  if (t[2]) throw takeFromExternrefTable0(t[1]);
  return takeFromExternrefTable0(t[0]);
}
function __wbg_adapter_34(e, t, n) {
  wasm.closure4183_externref_shim(e, t, n);
}
function __wbg_adapter_37(e, t) {
  wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0e313c173f41b6d6(e, t);
}
function __wbg_adapter_40(e, t, n) {
  wasm.closure4307_externref_shim(e, t, n);
}
function __wbg_adapter_43(e, t) {
  wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h82d3be3fbc9448fb(e, t);
}
function __wbg_adapter_46(e, t, n) {
  wasm.closure10080_externref_shim(e, t, n);
}
function __wbg_adapter_433(e, t, n, r) {
  wasm.closure10128_externref_shim(e, t, n, r);
}
var __wbindgen_enum_BinaryType = ["blob", "arraybuffer"];
var __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];
var __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];
async function __wbg_load(e, t) {
  if ("function" == typeof Response && e instanceof Response) {
    if ("function" == typeof WebAssembly.instantiateStreaming) try {
      return await WebAssembly.instantiateStreaming(e, t);
    } catch (t2) {
      if ("application/wasm" == e.headers.get("Content-Type")) throw t2;
      console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", t2);
    }
    const n = await e.arrayBuffer();
    return await WebAssembly.instantiate(n, t);
  }
  {
    const n = await WebAssembly.instantiate(e, t);
    return n instanceof WebAssembly.Instance ? { instance: n, module: e } : n;
  }
}
function __wbg_get_imports() {
  const e = { wbg: {} };
  return e.wbg.__wbg_abort_775ef1d17fc65868 = function(e2) {
    e2.abort();
  }, e.wbg.__wbg_append_299d5d48292c0495 = function() {
    return handleError(function(e2, t, n, r, i) {
      e2.append(getStringFromWasm0(t, n), getStringFromWasm0(r, i));
    }, arguments);
  }, e.wbg.__wbg_append_8c7dd8d641a5f01b = function() {
    return handleError(function(e2, t, n, r, i) {
      e2.append(getStringFromWasm0(t, n), getStringFromWasm0(r, i));
    }, arguments);
  }, e.wbg.__wbg_append_b2d1fc16de2a0e81 = function() {
    return handleError(function(e2, t, n, r, i, o) {
      e2.append(getStringFromWasm0(t, n), r, getStringFromWasm0(i, o));
    }, arguments);
  }, e.wbg.__wbg_append_b44785ebeb668479 = function() {
    return handleError(function(e2, t, n, r) {
      e2.append(getStringFromWasm0(t, n), r);
    }, arguments);
  }, e.wbg.__wbg_apply_36be6a55257c99bf = function() {
    return handleError(function(e2, t, n) {
      return e2.apply(t, n);
    }, arguments);
  }, e.wbg.__wbg_arrayBuffer_d1b44c4390db422f = function() {
    return handleError(function(e2) {
      return e2.arrayBuffer();
    }, arguments);
  }, e.wbg.__wbg_buffer_609cc3eee51ed158 = function(e2) {
    return e2.buffer;
  }, e.wbg.__wbg_call_672a4d21634d4a24 = function() {
    return handleError(function(e2, t) {
      return e2.call(t);
    }, arguments);
  }, e.wbg.__wbg_call_7cccdd69e0791ae2 = function() {
    return handleError(function(e2, t, n) {
      return e2.call(t, n);
    }, arguments);
  }, e.wbg.__wbg_clearInterval_d0ff292406f98cc3 = function(e2) {
    return clearInterval(e2);
  }, e.wbg.__wbg_clearTimeout_96804de0ab838f26 = function(e2) {
    return clearTimeout(e2);
  }, e.wbg.__wbg_close_2893b7d056a0627d = function() {
    return handleError(function(e2) {
      e2.close();
    }, arguments);
  }, e.wbg.__wbg_code_cfd8f6868bdaed9b = function(e2) {
    return e2.code;
  }, e.wbg.__wbg_code_f4ec1e6e2e1b0417 = function(e2) {
    return e2.code;
  }, e.wbg.__wbg_crypto_ed58b8e10a292839 = function(e2) {
    return e2.crypto;
  }, e.wbg.__wbg_data_432d9c3df2630942 = function(e2) {
    return e2.data;
  }, e.wbg.__wbg_done_769e5ede4b31c67b = function(e2) {
    return e2.done;
  }, e.wbg.__wbg_error_7534b8e9a36f1ab4 = function(e2, t) {
    let n, r;
    try {
      n = e2, r = t, console.error(getStringFromWasm0(e2, t));
    } finally {
      wasm.__wbindgen_free(n, r, 1);
    }
  }, e.wbg.__wbg_fetch_03b6c973bb6da9b8 = function(e2) {
    return fetch(e2);
  }, e.wbg.__wbg_fetch_509096533071c657 = function(e2, t) {
    return e2.fetch(t);
  }, e.wbg.__wbg_fromstring_de5470cadd25e572 = function(e2, t) {
    return from_string(getStringFromWasm0(e2, t));
  }, e.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function() {
    return handleError(function(e2, t) {
      e2.getRandomValues(t);
    }, arguments);
  }, e.wbg.__wbg_getTime_46267b1c24877e30 = function(e2) {
    return e2.getTime();
  }, e.wbg.__wbg_getTimezoneOffset_6b5752021c499c47 = function(e2) {
    return e2.getTimezoneOffset();
  }, e.wbg.__wbg_get_67b2ba62fc30de12 = function() {
    return handleError(function(e2, t) {
      return Reflect.get(e2, t);
    }, arguments);
  }, e.wbg.__wbg_getelement_fd3f268fc32b8d19 = function(e2, t) {
    return get_element(e2, t >>> 0);
  }, e.wbg.__wbg_has_a5ea9117f258a0ec = function() {
    return handleError(function(e2, t) {
      return Reflect.has(e2, t);
    }, arguments);
  }, e.wbg.__wbg_headers_9cb51cfd2ac780a4 = function(e2) {
    return e2.headers;
  }, e.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc = function(e2) {
    let t;
    try {
      t = e2 instanceof ArrayBuffer;
    } catch (e3) {
      t = false;
    }
    return t;
  }, e.wbg.__wbg_instanceof_Blob_ca721ef3bdab15d1 = function(e2) {
    let t;
    try {
      t = e2 instanceof Blob;
    } catch (e3) {
      t = false;
    }
    return t;
  }, e.wbg.__wbg_instanceof_Object_7f2dcef8f78644a4 = function(e2) {
    let t;
    try {
      t = e2 instanceof Object;
    } catch (e3) {
      t = false;
    }
    return t;
  }, e.wbg.__wbg_instanceof_Response_f2cc20d9f7dfd644 = function(e2) {
    let t;
    try {
      t = e2 instanceof Response;
    } catch (e3) {
      t = false;
    }
    return t;
  }, e.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function(e2) {
    let t;
    try {
      t = e2 instanceof Uint8Array;
    } catch (e3) {
      t = false;
    }
    return t;
  }, e.wbg.__wbg_iterator_9a24c88df860dc65 = function() {
    return Symbol.iterator;
  }, e.wbg.__wbg_length_a446193dc22c12f8 = function(e2) {
    return e2.length;
  }, e.wbg.__wbg_log_4dcc98b185543bcb = function(e2, t) {
    let n, r;
    try {
      n = e2, r = t, console.log(getStringFromWasm0(e2, t));
    } finally {
      wasm.__wbindgen_free(n, r, 1);
    }
  }, e.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function(e2) {
    return e2.msCrypto;
  }, e.wbg.__wbg_new0_f788a2397c7ca929 = function() {
    return /* @__PURE__ */ new Date();
  }, e.wbg.__wbg_new_018dcc2d6c8c2f6a = function() {
    return handleError(function() {
      return new Headers();
    }, arguments);
  }, e.wbg.__wbg_new_23a2665fac83c611 = function(e2, t) {
    try {
      var n = { a: e2, b: t };
      const r = new Promise((e3, t2) => {
        const r2 = n.a;
        n.a = 0;
        try {
          return __wbg_adapter_433(r2, n.b, e3, t2);
        } finally {
          n.a = r2;
        }
      });
      return r;
    } finally {
      n.a = n.b = 0;
    }
  }, e.wbg.__wbg_new_31a97dac4f10fab7 = function(e2) {
    return new Date(e2);
  }, e.wbg.__wbg_new_405e22f390576ce2 = function() {
    return new Object();
  }, e.wbg.__wbg_new_78feb108b6472713 = function() {
    return new Array();
  }, e.wbg.__wbg_new_8a6f238a6ece86ea = function() {
    return new Error();
  }, e.wbg.__wbg_new_92c54fc74574ef55 = function() {
    return handleError(function(e2, t) {
      return new WebSocket(getStringFromWasm0(e2, t));
    }, arguments);
  }, e.wbg.__wbg_new_9fd39a253424609a = function() {
    return handleError(function() {
      return new FormData();
    }, arguments);
  }, e.wbg.__wbg_new_a12002a7f91c75be = function(e2) {
    return new Uint8Array(e2);
  }, e.wbg.__wbg_new_c68d7209be747379 = function(e2, t) {
    return new Error(getStringFromWasm0(e2, t));
  }, e.wbg.__wbg_new_cdd9942127fcb1fd = function(e2, t) {
    return new Error(getStringFromWasm0(e2, t));
  }, e.wbg.__wbg_new_e25e5aab09ff45db = function() {
    return handleError(function() {
      return new AbortController();
    }, arguments);
  }, e.wbg.__wbg_newnoargs_105ed471475aaf50 = function(e2, t) {
    return new Function(getStringFromWasm0(e2, t));
  }, e.wbg.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function(e2, t, n) {
    return new Uint8Array(e2, t >>> 0, n >>> 0);
  }, e.wbg.__wbg_newwithlength_a381634e90c276d4 = function(e2) {
    return new Uint8Array(e2 >>> 0);
  }, e.wbg.__wbg_newwithstrandinit_06c535e0a867c635 = function() {
    return handleError(function(e2, t, n) {
      return new Request(getStringFromWasm0(e2, t), n);
    }, arguments);
  }, e.wbg.__wbg_newwithstrsequence_6e9d6479e1cf978d = function() {
    return handleError(function(e2, t, n) {
      return new WebSocket(getStringFromWasm0(e2, t), n);
    }, arguments);
  }, e.wbg.__wbg_newwithu8arraysequenceandoptions_068570c487f69127 = function() {
    return handleError(function(e2, t) {
      return new Blob(e2, t);
    }, arguments);
  }, e.wbg.__wbg_next_25feadfc0913fea9 = function(e2) {
    return e2.next;
  }, e.wbg.__wbg_next_6574e1a8a62d1055 = function() {
    return handleError(function(e2) {
      return e2.next();
    }, arguments);
  }, e.wbg.__wbg_node_02999533c4ea02e3 = function(e2) {
    return e2.node;
  }, e.wbg.__wbg_now_807e54c39636c349 = function() {
    return Date.now();
  }, e.wbg.__wbg_now_d18023d54d4e5500 = function(e2) {
    return e2.now();
  }, e.wbg.__wbg_process_5c1d670bc53614b8 = function(e2) {
    return e2.process;
  }, e.wbg.__wbg_push_737cfc8c1432c2c6 = function(e2, t) {
    return e2.push(t);
  }, e.wbg.__wbg_queueMicrotask_97d92b4fcc8a61c5 = function(e2) {
    queueMicrotask(e2);
  }, e.wbg.__wbg_queueMicrotask_d3219def82552485 = function(e2) {
    return e2.queueMicrotask;
  }, e.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function() {
    return handleError(function(e2, t) {
      e2.randomFillSync(t);
    }, arguments);
  }, e.wbg.__wbg_readyState_7ef6e63c349899ed = function(e2) {
    return e2.readyState;
  }, e.wbg.__wbg_reason_49f1cede8bcf23dd = function(e2, t) {
    const n = passStringToWasm0(t.reason, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc), r = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(e2 + 4, r, true), getDataViewMemory0().setInt32(e2 + 0, n, true);
  }, e.wbg.__wbg_require_79b1e9274cde3c87 = function() {
    return handleError(function() {
      return module.require;
    }, arguments);
  }, e.wbg.__wbg_resolve_4851785c9c5f573d = function(e2) {
    return Promise.resolve(e2);
  }, e.wbg.__wbg_send_0293179ba074ffb4 = function() {
    return handleError(function(e2, t, n) {
      e2.send(getStringFromWasm0(t, n));
    }, arguments);
  }, e.wbg.__wbg_send_fc0c204e8a1757f4 = function() {
    return handleError(function(e2, t, n) {
      e2.send(getArrayU8FromWasm0(t, n));
    }, arguments);
  }, e.wbg.__wbg_setInterval_bede69d6c8f41bb4 = function() {
    return handleError(function(e2, t) {
      return setInterval(e2, t);
    }, arguments);
  }, e.wbg.__wbg_setTimeout_eefe7f4c234b0c6b = function() {
    return handleError(function(e2, t) {
      return setTimeout(e2, t);
    }, arguments);
  }, e.wbg.__wbg_set_65595bdd868b3009 = function(e2, t, n) {
    e2.set(t, n >>> 0);
  }, e.wbg.__wbg_set_bb8cecf6a62b9f46 = function() {
    return handleError(function(e2, t, n) {
      return Reflect.set(e2, t, n);
    }, arguments);
  }, e.wbg.__wbg_setbinaryType_92fa1ffd873b327c = function(e2, t) {
    e2.binaryType = __wbindgen_enum_BinaryType[t];
  }, e.wbg.__wbg_setbody_5923b78a95eedf29 = function(e2, t) {
    e2.body = t;
  }, e.wbg.__wbg_setcredentials_c3a22f1cd105a2c6 = function(e2, t) {
    e2.credentials = __wbindgen_enum_RequestCredentials[t];
  }, e.wbg.__wbg_setheaders_834c0bdb6a8949ad = function(e2, t) {
    e2.headers = t;
  }, e.wbg.__wbg_setmethod_3c5280fe5d890842 = function(e2, t, n) {
    e2.method = getStringFromWasm0(t, n);
  }, e.wbg.__wbg_setmode_5dc300b865044b65 = function(e2, t) {
    e2.mode = __wbindgen_enum_RequestMode[t];
  }, e.wbg.__wbg_setonclose_14fc475a49d488fc = function(e2, t) {
    e2.onclose = t;
  }, e.wbg.__wbg_setonerror_8639efe354b947cd = function(e2, t) {
    e2.onerror = t;
  }, e.wbg.__wbg_setonmessage_6eccab530a8fb4c7 = function(e2, t) {
    e2.onmessage = t;
  }, e.wbg.__wbg_setonopen_2da654e1f39745d5 = function(e2, t) {
    e2.onopen = t;
  }, e.wbg.__wbg_setsignal_75b21ef3a81de905 = function(e2, t) {
    e2.signal = t;
  }, e.wbg.__wbg_settype_39ed370d3edd403c = function(e2, t, n) {
    e2.type = getStringFromWasm0(t, n);
  }, e.wbg.__wbg_signal_aaf9ad74119f20a4 = function(e2) {
    return e2.signal;
  }, e.wbg.__wbg_stack_0ed75d68575b0f3c = function(e2, t) {
    const n = passStringToWasm0(t.stack, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc), r = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(e2 + 4, r, true), getDataViewMemory0().setInt32(e2 + 0, n, true);
  }, e.wbg.__wbg_stack_5184e86c2ee98052 = function(e2, t) {
    const n = passStringToWasm0(t.stack, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc), r = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(e2 + 4, r, true), getDataViewMemory0().setInt32(e2 + 0, n, true);
  }, e.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
    const e2 = "undefined" == typeof global ? null : global;
    return isLikeNone(e2) ? 0 : addToExternrefTable0(e2);
  }, e.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
    const e2 = "undefined" == typeof globalThis ? null : globalThis;
    return isLikeNone(e2) ? 0 : addToExternrefTable0(e2);
  }, e.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
    const e2 = "undefined" == typeof self ? null : self;
    return isLikeNone(e2) ? 0 : addToExternrefTable0(e2);
  }, e.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
    const e2 = "undefined" == typeof window ? null : window;
    return isLikeNone(e2) ? 0 : addToExternrefTable0(e2);
  }, e.wbg.__wbg_status_f6360336ca686bf0 = function(e2) {
    return e2.status;
  }, e.wbg.__wbg_stringify_f7ed6987935b4a24 = function() {
    return handleError(function(e2) {
      return JSON.stringify(e2);
    }, arguments);
  }, e.wbg.__wbg_subarray_aa9065fa9dc5df96 = function(e2, t, n) {
    return e2.subarray(t >>> 0, n >>> 0);
  }, e.wbg.__wbg_then_44b73946d2fb3e7d = function(e2, t) {
    return e2.then(t);
  }, e.wbg.__wbg_then_48b406749878a531 = function(e2, t, n) {
    return e2.then(t, n);
  }, e.wbg.__wbg_tostring_da980fc4fe2711a0 = function(e2, t) {
    const n = passStringToWasm0(to_string(t), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc), r = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(e2 + 4, r, true), getDataViewMemory0().setInt32(e2 + 0, n, true);
  }, e.wbg.__wbg_typeof_2e6e8f97a58dc821 = function(e2, t) {
    const n = passStringToWasm0(typeof_(t), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc), r = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(e2 + 4, r, true), getDataViewMemory0().setInt32(e2 + 0, n, true);
  }, e.wbg.__wbg_url_ae10c34ca209681d = function(e2, t) {
    const n = passStringToWasm0(t.url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc), r = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(e2 + 4, r, true), getDataViewMemory0().setInt32(e2 + 0, n, true);
  }, e.wbg.__wbg_url_ce9ab75bf9627ae4 = function(e2, t) {
    const n = passStringToWasm0(t.url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc), r = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(e2 + 4, r, true), getDataViewMemory0().setInt32(e2 + 0, n, true);
  }, e.wbg.__wbg_valueOf_7392193dd78c6b97 = function(e2) {
    return e2.valueOf();
  }, e.wbg.__wbg_valueOf_fdbb54fcdfe33477 = function(e2) {
    return e2.valueOf();
  }, e.wbg.__wbg_value_cd1ffa7b1ab794f1 = function(e2) {
    return e2.value;
  }, e.wbg.__wbg_versions_c71aa1626a93e0a1 = function(e2) {
    return e2.versions;
  }, e.wbg.__wbg_wasClean_605b4fd66d44354a = function(e2) {
    return e2.wasClean;
  }, e.wbg.__wbindgen_cb_drop = function(e2) {
    const t = e2.original;
    if (1 == t.cnt--) return t.a = 0, true;
    return false;
  }, e.wbg.__wbindgen_closure_wrapper12785 = function(e2, t, n) {
    return makeMutClosure(e2, t, 4184, __wbg_adapter_34);
  }, e.wbg.__wbindgen_closure_wrapper12787 = function(e2, t, n) {
    return makeMutClosure(e2, t, 4184, __wbg_adapter_37);
  }, e.wbg.__wbindgen_closure_wrapper12951 = function(e2, t, n) {
    return makeMutClosure(e2, t, 4308, __wbg_adapter_40);
  }, e.wbg.__wbindgen_closure_wrapper27328 = function(e2, t, n) {
    return makeMutClosure(e2, t, 9541, __wbg_adapter_43);
  }, e.wbg.__wbindgen_closure_wrapper29284 = function(e2, t, n) {
    return makeMutClosure(e2, t, 10081, __wbg_adapter_46);
  }, e.wbg.__wbindgen_debug_string = function(e2, t) {
    const n = passStringToWasm0(debugString(t), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc), r = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(e2 + 4, r, true), getDataViewMemory0().setInt32(e2 + 0, n, true);
  }, e.wbg.__wbindgen_error_new = function(e2, t) {
    return new Error(getStringFromWasm0(e2, t));
  }, e.wbg.__wbindgen_init_externref_table = function() {
    const e2 = wasm.__wbindgen_export_2, t = e2.grow(4);
    e2.set(0, void 0), e2.set(t + 0, void 0), e2.set(t + 1, null), e2.set(t + 2, true), e2.set(t + 3, false);
  }, e.wbg.__wbindgen_is_function = function(e2) {
    return "function" == typeof e2;
  }, e.wbg.__wbindgen_is_null = function(e2) {
    return null === e2;
  }, e.wbg.__wbindgen_is_object = function(e2) {
    return "object" == typeof e2 && null !== e2;
  }, e.wbg.__wbindgen_is_string = function(e2) {
    return "string" == typeof e2;
  }, e.wbg.__wbindgen_is_undefined = function(e2) {
    return void 0 === e2;
  }, e.wbg.__wbindgen_memory = function() {
    return wasm.memory;
  }, e.wbg.__wbindgen_number_new = function(e2) {
    return e2;
  }, e.wbg.__wbindgen_string_get = function(e2, t) {
    const n = "string" == typeof t ? t : void 0;
    var r = isLikeNone(n) ? 0 : passStringToWasm0(n, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc), i = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(e2 + 4, i, true), getDataViewMemory0().setInt32(e2 + 0, r, true);
  }, e.wbg.__wbindgen_string_new = function(e2, t) {
    return getStringFromWasm0(e2, t);
  }, e.wbg.__wbindgen_throw = function(e2, t) {
    throw new Error(getStringFromWasm0(e2, t));
  }, e["./snippets/napi-dispatcher-wasm-2f83e9bddb5a9c18/inline0.js"] = __wbg_star0, e["./snippets/safer-ffi-bece3b9eaa5b1be9/inline0.js"] = __wbg_star1, e;
}
function __wbg_finalize_init(e, t) {
  return wasm = e.exports, init$2.__wbindgen_wasm_module = t, cachedDataViewMemory0 = null, cachedUint8ArrayMemory0 = null, wasm.__wbindgen_start(), wasm;
}
async function init$2(e) {
  if (void 0 !== wasm) return wasm;
  if (void 0 !== e && (Object.getPrototypeOf(e) === Object.prototype ? { module_or_path: e } = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), void 0 === e) throw new Error("Can't load ditto.wasm, expected module to be provided at initialization time but got nothing.");
  const t = __wbg_get_imports();
  ("string" == typeof e || "function" == typeof Request && e instanceof Request || "function" == typeof URL && e instanceof URL) && (e = fetch(e));
  const { instance: n, module: r } = await __wbg_load(await e, t);
  return __wbg_finalize_init(n, r);
}
var PREFIX_REGEX = new RegExp(/^<.*?>\s*/);
var DittoFFIError = class extends Error {
  constructor(e, t, n) {
    const r = ffiErrorMessage();
    super(t || r || n), this.code = e;
  }
};
function throwOnErrorResult(e, t) {
  if (null !== e) {
    let n, r;
    try {
      n = dittoffi_error_code(e), r = boxCStringIntoString(dittoffi_error_description(e)), dittoffi_error_free(e);
    } catch (e2) {
      throw new DittoFFIError(-1, `Failed to retrieve Ditto core error message: ${e2.message}`);
    }
    throw r = null == r ? `${t}() failed with error code: ${n}` : r.replace(PREFIX_REGEX, ""), new DittoFFIError(n, r);
  }
}
function ffiErrorMessage() {
  return boxCStringIntoString(ditto_error_message());
}
var DittoCRDTTypeKey = "_ditto_internal_type_jkb12973t4b";
var DittoCRDTType;
function documentSetCBORWithTimestamp(e, t, n, r) {
  ensureInitialized();
  const i = ditto_document_set_cbor_with_timestamp(e, bytesFromString(t), n, r);
  if (0 !== i) throw new Error(errorMessage() || `ditto_document_set_cbor_with_timestamp() failed with error code: ${i}`);
}
function documentSetCBOR(e, t, n) {
  ensureInitialized();
  const r = ditto_document_set_cbor(e, bytesFromString(t), n);
  if (0 !== r) throw new Error(errorMessage() || `ditto_document_set_cbor() failed with error code: ${r}`);
}
function documentID(e) {
  ensureInitialized();
  return boxCBytesIntoBuffer(ditto_document_id(e));
}
function documentGetCBORWithPathType(e, t, n) {
  ensureInitialized();
  const r = ditto_document_get_cbor_with_path_type(e, bytesFromString(t), n);
  return { statusCode: r.status_code, cbor: boxCBytesIntoBuffer(r.cbor) };
}
function documentRemove(e, t) {
  ensureInitialized();
  const n = ditto_document_remove(e, bytesFromString(t));
  if (0 !== n) throw new Error(errorMessage() || `ditto_document_remove() failed with error code: ${n}`);
}
function documentIncrementCounter(e, t, n) {
  ensureInitialized();
  const r = ditto_document_increment_counter(e, bytesFromString(t), n);
  if (0 !== r) throw new Error(errorMessage() || `ditto_document_increment_counter() failed with error code: ${r}`);
}
function documentFree(e) {
  ensureInitialized(), ditto_document_free(e);
}
function documentIDQueryCompatible(e, t) {
  ensureInitialized();
  return boxCStringIntoString(ditto_document_id_query_compatible(e, t));
}
function validateDocumentID(e) {
  ensureInitialized();
  return boxCBytesIntoBuffer(withOutBoxCBytes((t) => {
    const n = ditto_validate_document_id(e, t);
    if (0 !== n) throw new Error(errorMessage() || `ditto_validate_document_id() failed with error code: ${n}`);
    return t;
  }));
}
async function collectionGet(e, t, n, r) {
  ensureInitialized();
  const i = bytesFromString(t), { status_code: o, document: a } = await ditto_collection_get(e, i, n, r);
  if (o === NOT_FOUND_ERROR_CODE) return null;
  if (0 !== o) throw new Error(errorMessage() || `ditto_collection_get() failed with error code: ${o}`);
  return a;
}
async function collectionGetWithWriteTransaction(e, t, n, r) {
  ensureInitialized();
  const i = bytesFromString(t), { status_code: o, document: a } = await ditto_collection_get_with_write_transaction(e, i, n, r);
  if (o === NOT_FOUND_ERROR_CODE) return null;
  if (0 !== o) throw new Error(errorMessage() || `ditto_collection_get_with_write_transaction() failed with error code: ${o}`);
  return a;
}
async function collectionInsertValue(e, t, n, r, i) {
  ensureInitialized();
  const o = bytesFromString(t);
  let a;
  switch (r) {
    case "merge":
      a = "Merge";
      break;
    case "insertIfAbsent":
      a = "InsertIfAbsent";
      break;
    case "insertDefaultIfAbsent":
      a = "InsertDefaultIfAbsent";
      break;
    case "updateDifferentValues":
      a = "UpdateDifferentValues";
      break;
    default:
      throw new Error(`Unsupported write strategy '${r}' provided.`);
  }
  const { status_code: s, id: c } = await ditto_collection_insert_value(e, o, n, a, null, null != i ? i : null);
  if (0 !== s) throw new Error(errorMessage() || `ditto_collection_insert_value() failed with error code: ${s}`);
  return boxCBytesIntoBuffer(c);
}
async function collectionRemove(e, t, n, r) {
  ensureInitialized();
  const i = bytesFromString(t), { status_code: o, bool_value: a } = await ditto_collection_remove(e, i, n, r);
  if (0 !== o) throw new Error(errorMessage() || `ditto_collection_remove() failed with error code: ${o}`);
  return a;
}
async function collectionEvict(e, t, n, r) {
  ensureInitialized();
  const i = bytesFromString(t), { status_code: o, bool_value: a } = await ditto_collection_evict(e, i, n, r);
  if (0 !== o) throw new Error(errorMessage() || `ditto_collection_evict() failed with error code: ${o}`);
  return a;
}
async function collectionUpdate(e, t, n, r) {
  ensureInitialized();
  const i = bytesFromString(t), o = await ditto_collection_update(e, i, n, r);
  if (0 !== o) throw new Error(errorMessage() || `ditto_collection_update() failed with error code: ${o}`);
}
async function collectionUpdateMultiple(e, t, n, r) {
  ensureInitialized();
  const i = bytesFromString(t), o = jsDocsToCDocs(r), a = await ditto_collection_update_multiple(e, i, n, o);
  if (0 !== a) throw new Error(errorMessage() || `ditto_collection_update_multiple() failed with error code: ${a}`);
}
async function collectionExecQueryStr(e, t, n, r, i, o, a, s) {
  ensureInitialized();
  const c = bytesFromString(t), l = bytesFromString(r);
  return await ditto_collection_exec_query_str(e, c, n, l, i, o, a, s);
}
async function collectionRemoveQueryStr(e, t, n, r, i, o, a, s) {
  ensureInitialized();
  const c = bytesFromString(t), l = bytesFromString(r);
  return await ditto_collection_remove_query_str(e, c, n, l, i, o, a, s);
}
async function collectionEvictQueryStr(e, t, n, r, i, o, a, s) {
  ensureInitialized();
  const c = bytesFromString(t), l = bytesFromString(r);
  return await ditto_collection_evict_query_str(e, c, n, l, i, o, a, s);
}
async function tryExecStatement(e, t, n) {
  ensureInitialized();
  const r = bytesFromString(t), i = await dittoffi_try_exec_statement(e, r, n);
  return throwOnErrorResult(i.error, "dittoffi_try_exec_statement"), i.success;
}
function addSubscription(e, t, n, r, i, o, a) {
  ensureInitialized();
  const s = ditto_add_subscription(e, bytesFromString(t), bytesFromString(n), r, i, o, a);
  if (0 !== s) throw new Error(errorMessage() || `ditto_add_subscription() failed with error code: ${s}`);
}
function removeSubscription(e, t, n, r, i, o, a) {
  ensureInitialized();
  const s = ditto_remove_subscription(e, bytesFromString(t), bytesFromString(n), r, i, o, a);
  if (0 !== s) throw new Error(errorMessage() || `ditto_remove_subscription() failed with error code: ${s}`);
}
function tryAddSyncSubscription(e, t, n) {
  ensureInitialized();
  throwOnErrorResult(dittoffi_try_add_sync_subscription(e, bytesFromString(t), n).error, "dittoffi_try_add_sync_subscription");
}
function tryRemoveSyncSubscription(e, t, n) {
  ensureInitialized();
  throwOnErrorResult(dittoffi_try_remove_sync_subscription(e, bytesFromString(t), n).error, "dittoffi_try_remove_sync_subscription");
}
function queryResultFree(e) {
  ensureInitialized(), dittoffi_query_result_free(e);
}
function queryResultItemFree(e) {
  ensureInitialized(), dittoffi_query_result_item_free(e);
}
function queryResultItems(e) {
  ensureInitialized();
  const t = [], n = dittoffi_query_result_item_count(e);
  for (let r = 0; r < n; r++) t.push(dittoffi_query_result_item_at(e, r));
  return t;
}
function queryResultMutatedDocumentIDs(e) {
  ensureInitialized();
  const t = [], n = dittoffi_query_result_mutated_document_id_count(e);
  for (let r = 0; r < n; r++) {
    const n2 = dittoffi_query_result_mutated_document_id_at(e, r);
    t.push(boxCBytesIntoBuffer(n2));
  }
  return t;
}
function queryResultItemCBOR(e) {
  ensureInitialized();
  return boxCBytesIntoBuffer(dittoffi_query_result_item_cbor(e));
}
function queryResultItemJSON(e) {
  ensureInitialized();
  return boxCStringIntoString(dittoffi_query_result_item_json(e));
}
function liveQueryRegister(e, t, n, r, i, o, a, s, c) {
  ensureInitialized();
  const l = bytesFromString(t), u = bytesFromString(n), { status_code: d, i64: f } = ditto_live_query_register_str_detached(e, l, u, r, i, o, a, wrapBackgroundCbForFFI(c, s));
  if (0 !== d) throw new Error(errorMessage() || `\`ditto_live_query_register_str()\` failed with error code: ${d}`);
  return f;
}
function tryExperimentalRegisterChangeObserver(e, t, n, r) {
  ensureInitialized();
  const i = wrapBackgroundCbForFFI((e2) => log("Error", `The registered store observer callback failed with ${e2}`), r), o = dittoffi_try_experimental_register_change_observer_str_detached(e, bytesFromString(t), n, i);
  return throwOnErrorResult(o.error, "dittoffi_try_experimental_register_change_observer_str_detached"), o.success;
}
async function liveQueryStart(e, t) {
  ensureInitialized();
  const n = await ditto_live_query_start(e, t);
  if (0 !== n) throw new Error(errorMessage() || `\`ditto_live_query_start()\` failed with error code: ${n}`);
}
function liveQueryStop(e, t) {
  ensureInitialized(), ditto_live_query_stop(e, t);
}
async function liveQuerySignalAvailableNext(e, t) {
  ensureInitialized(), await ditto_live_query_signal_available_next(e, t);
}
async function liveQueryWebhookRegister(e, t, n, r, i, o, a) {
  ensureInitialized();
  const s = bytesFromString(t), c = bytesFromString(n), l = bytesFromString(a), { status_code: u, id: d } = await ditto_live_query_webhook_register_str(e, s, c, r, i, o, l);
  if (0 !== u) throw new Error(errorMessage() || `\`ditto_live_query_webhook_register_str()\` failed with error code: ${u}`);
  return boxCBytesIntoBuffer(d);
}
async function readTransaction(e) {
  ensureInitialized();
  const { status_code: t, txn: n } = await ditto_read_transaction(e);
  if (0 !== t) throw new Error(errorMessage() || `\`ditto_read_transaction()\` failed with error code: ${t}`);
  return n;
}
function readTransactionFree(e) {
  return ensureInitialized(), ditto_read_transaction_free(e);
}
async function writeTransaction(e) {
  ensureInitialized();
  const { status_code: t, txn: n } = await ditto_write_transaction(e, null);
  if (0 !== t) throw new Error(errorMessage() || `ditto_write_transaction() failed with error code: ${t}`);
  return n;
}
async function writeTransactionCommit(e, t) {
  ensureInitialized();
  const n = await ditto_write_transaction_commit(e, t);
  if (0 !== n) throw new Error(errorMessage() || `ditto_write_transaction_commit() failed with error code: ${n}`);
}
async function writeTransactionRollback(e, t) {
  ensureInitialized();
  const n = await ditto_write_transaction_rollback(e, t);
  if (0 !== n) throw new Error(errorMessage() || `ditto_write_transaction_rollback() failed with error code: ${n}`);
}
function loggerInit() {
  ensureInitialized(), ditto_logger_init();
}
async function loggerSetCustomLogCb(e) {
  if (ensureInitialized(), null === e) await ditto_logger_set_custom_log_cb(null);
  else {
    const t = wrapBackgroundCbForFFI(null, (t2, n) => {
      try {
        const r = boxCStringIntoString(n);
        e(t2, r);
      } catch (e2) {
        log("Error", `The registered cb in \`ditto_logger_set_custom_log_cb()\` failed with: ${e2}`);
      }
    });
    await ditto_logger_set_custom_log_cb(t);
  }
}
function loggerEnabled(e) {
  ensureInitialized(), ditto_logger_enabled(!!e);
}
function loggerEnabledGet() {
  return ensureInitialized(), !!ditto_logger_enabled_get();
}
function loggerEmojiHeadingsEnabled(e) {
  ensureInitialized(), ditto_logger_emoji_headings_enabled(e);
}
function loggerEmojiHeadingsEnabledGet() {
  return ensureInitialized(), ditto_logger_emoji_headings_enabled_get();
}
function loggerMinimumLogLevel(e) {
  ensureInitialized(), ditto_logger_minimum_log_level(e);
}
function loggerMinimumLogLevelGet() {
  return ensureInitialized(), ditto_logger_minimum_log_level_get();
}
function loggerSetLogFile(e) {
  ensureInitialized();
  if (0 !== ditto_logger_set_log_file(e ? bytesFromString(e) : null)) {
    const e2 = errorMessage();
    throw new Error(`Can't set log file, due to error: ${e2}`);
  }
}
async function loggerTryExportToFileAsync(e) {
  ensureInitialized();
  const t = bytesFromString(e), n = await new Promise((e2, n2) => {
    const r = wrapBackgroundCbForFFI(n2, e2);
    dittoffi_logger_try_export_to_file_async(t, r);
  });
  return throwOnErrorResult(n.error, "dittoffi_logger_try_export_to_file_async"), n.success;
}
function log(e, t) {
  ensureInitialized();
  ditto_log(e, bytesFromString(t));
}
function dittoIdentityConfigMakeOnlinePlayground(e, t, n) {
  ensureInitialized();
  const r = bytesFromString(e), i = bytesFromString(t), o = bytesFromString(n), { status_code: a, identity_config: s } = ditto_identity_config_make_online_playground(r, i, o);
  if (0 !== a) throw new Error(errorMessage() || `ditto_identity_config_make_online_playground() failed with error code: ${a}`);
  return s;
}
function dittoIdentityConfigMakeOnlineWithAuthentication(e, t) {
  ensureInitialized();
  const n = bytesFromString(e), r = bytesFromString(t), { status_code: i, identity_config: o } = ditto_identity_config_make_online_with_authentication(n, r);
  if (0 !== i) throw new Error(errorMessage() || `ditto_identity_config_make_online_with_authentication() failed with error code: ${i}`);
  return o;
}
function dittoIdentityConfigMakeOfflinePlayground(e, t) {
  ensureInitialized();
  const n = bytesFromString(e), r = Number(t), { status_code: i, identity_config: o } = ditto_identity_config_make_offline_playground(n, r);
  if (0 !== i) throw new Error(errorMessage() || `ditto_identity_config_make_offline_playground() failed with error code: ${i}`);
  return o;
}
function dittoIdentityConfigMakeSharedKey(e, t, n) {
  ensureInitialized();
  const r = bytesFromString(e), i = bytesFromString(t), o = Number(n), { status_code: a, identity_config: s } = ditto_identity_config_make_shared_key(r, i, o);
  if (0 !== a) throw new Error(errorMessage() || `ditto_identity_config_make_shared_key() failed with error code: ${a}`);
  return s;
}
function dittoIdentityConfigMakeManual(e) {
  ensureInitialized();
  const t = bytesFromString(e), { status_code: n, identity_config: r } = ditto_identity_config_make_manual_v0(t);
  if (0 !== n) throw new Error(errorMessage() || `ditto_identity_config_make_manual_v0() failed with error code: ${n}`);
  return r;
}
function dittoAuthClientGetSiteID(e) {
  return ensureInitialized(), ditto_auth_client_get_site_id(e);
}
function dittoAuthClientGetAppID(e) {
  ensureInitialized();
  return boxCStringIntoString(ditto_auth_client_get_app_id(e));
}
function dittoAuthClientUserID(e) {
  ensureInitialized();
  return boxCStringIntoString(ditto_auth_client_user_id(e));
}
function dittoAuthClientIsWebValid(e) {
  return ensureInitialized(), 0 !== ditto_auth_client_is_web_valid(e);
}
async function dittoAuthClientLoginWithTokenAndFeedback(e, t, n) {
  ensureInitialized();
  const r = bytesFromString(t), i = bytesFromString(n), o = await ditto_auth_client_login_with_token_and_feedback(e, r, i);
  return { error: 0 === o.status_code ? null : new DittoFFIError(o.status_code, void 0, "Ditto failed to authenticate."), clientInfo: o.c_string ? boxCStringIntoString(o.c_string) : null };
}
async function dittoAuthClientLoginWithToken(e, t, n) {
  ensureInitialized();
  const r = bytesFromString(t), i = bytesFromString(n), o = await ditto_auth_client_login_with_token(e, r, i);
  if (0 !== o) throw new Error(errorMessage() || `Ditto failed to authenticate (error code: ${o}).`);
}
async function dittoAuthClientLoginWithUsernameAndPassword(e, t, n, r) {
  ensureInitialized();
  const i = bytesFromString(t), o = bytesFromString(n), a = bytesFromString(r), s = await ditto_auth_client_login_with_credentials(e, i, o, a);
  if (0 !== s) throw new Error(errorMessage() || `Ditto failed to authenticate (error code: ${s}).`);
}
async function dittoAuthClientLogout(e) {
  ensureInitialized();
  const t = await ditto_auth_client_logout(e);
  if (0 !== t) throw new Error(errorMessage() || `Ditto failed to logout (error code: ${t}).`);
}
function dittoSetAuthenticationStatusHandler(e, t, n) {
  ensureInitialized(), dittoffi_ditto_set_authentication_status_handler(e, wrapBackgroundCbForFFI(n, t));
}
function authenticationStatusUserID(e) {
  return ensureInitialized(), boxCStringIntoString(dittoffi_authentication_status_user_id(e));
}
function authenticationStatusIsAuthenticated(e) {
  return ensureInitialized(), dittoffi_authentication_status_is_authenticated(e);
}
function authenticationStatusFree(e) {
  ensureInitialized(), dittoffi_authentication_status_free(e);
}
function dittoMakeWithTransportConfigMode(e, t, n, r) {
  ensureInitialized();
  return dittoffi_make_with_transport_config_mode(bytesFromString(e), t, n, r);
}
async function dittoGetCollectionNames(e) {
  ensureInitialized();
  const t = await ditto_get_collection_names(e), n = t.status_code, r = t.names;
  if (0 !== n) throw new Error(errorMessage() || `ditto_get_collection_names() failed with error code: ${n}`);
  return cStringVecToStringArray(r);
}
function dittoFree(e) {
  return ensureInitialized(), ditto_free(e);
}
function cryptoGenerateSecureRandomToken() {
  ensureInitialized();
  return boxCStringIntoString(dittoffi_crypto_generate_secure_random_token());
}
function dittoRegisterPresenceV1Callback(e, t) {
  ensureInitialized(), ditto_register_presence_v1_callback(e, wrapBackgroundCbForFFI((e2) => log("Error", `The registered presence callback v1 errored with ${e2}`), (e2) => {
    const n = refCStringToString(e2);
    t(n);
  }));
}
async function dittoClearPresenceCallback(e) {
  return ensureInitialized(), ditto_clear_presence_callback(e);
}
function dittoRegisterPresenceV3Callback(e, t) {
  ensureInitialized(), ditto_register_presence_v3_callback(e, wrapBackgroundCbForFFI((e2) => log("Error", `The registered presence callback v3 errored with ${e2}`), (e2) => {
    const n = refCStringToString(e2);
    t(n);
  }));
}
async function dittoClearPresenceV3Callback(e) {
  return ensureInitialized(), ditto_clear_presence_v3_callback(e);
}
function presencePeerMetadataJSON(e) {
  ensureInitialized();
  const t = boxCBytesIntoBuffer(dittoffi_presence_peer_metadata_json(e));
  return new TextDecoder().decode(t);
}
async function presenceTrySetPeerMetadataJSON(e, t) {
  ensureInitialized();
  const n = bytesFromString(t);
  throwOnErrorResult((await dittoffi_presence_try_set_peer_metadata_json(e, n)).error, "dittoffi_presence_try_set_peer_metadata_json");
}
function connectionRequestPeerKeyString(e) {
  ensureInitialized();
  return boxCStringIntoString(dittoffi_connection_request_peer_key_string(e));
}
function connectionRequestPeerMetadataJSON(e) {
  ensureInitialized();
  const t = refCBytesIntoBuffer(dittoffi_connection_request_peer_metadata_json(e));
  return new TextDecoder().decode(t);
}
function connectionRequestIdentityServiceMetadataJSON(e) {
  ensureInitialized();
  const t = refCBytesIntoBuffer(dittoffi_connection_request_identity_service_metadata_json(e));
  return new TextDecoder().decode(t);
}
function connectionRequestConnectionType(e) {
  return ensureInitialized(), dittoffi_connection_request_connection_type(e);
}
function connectionRequestAuthorize(e, t) {
  ensureInitialized(), dittoffi_connection_request_authorize(e, t);
}
function connectionRequestFree(e) {
  ensureInitialized(), dittoffi_connection_request_free(e);
}
function presenceSetConnectionRequestHandler(e, t, n) {
  if (ensureInitialized(), null == t) dittoffi_presence_set_connection_request_handler(e, null);
  else {
    dittoffi_presence_set_connection_request_handler(e, wrapAsyncBackgroundCbForFFI(n, t));
  }
}
function dittoIsActivated(e) {
  return ensureInitialized(), dittoffi_ditto_is_activated(e);
}
function dittoIsSyncActive(e) {
  return ensureInitialized(), dittoffi_ditto_is_sync_active(e);
}
function dittoStartSync(e) {
  ensureInitialized();
  throwOnErrorResult(dittoffi_ditto_try_start_sync(e).error, "dittoffi_ditto_try_start_sync");
}
function dittoStopSync(e) {
  return ensureInitialized(), dittoffi_ditto_stop_sync(e);
}
function dittoSetTransportConfig(e, t) {
  ensureInitialized();
  throwOnErrorResult(dittoffi_ditto_try_set_transport_config(e, t, true).error, "dittoffi_ditto_try_set_transport_config");
}
function dittoTransportConfig(e) {
  ensureInitialized();
  return boxCBytesIntoBuffer(dittoffi_ditto_transport_config(e));
}
function dittoSetCloudSyncEnabled(e, t) {
  ensureInitialized(), dittoffi_ditto_set_cloud_sync_enabled(e, t);
}
function dittoSmallPeerInfoGetIsEnabled(e) {
  return ensureInitialized(), ditto_small_peer_info_get_is_enabled(e);
}
async function dittoSmallPeerInfoSetEnabled(e, t) {
  ensureInitialized(), ditto_small_peer_info_set_enabled(e, t);
}
async function dittoSmallPeerInfoGetSyncScope(e) {
  return ensureInitialized(), ditto_small_peer_info_get_sync_scope(e);
}
async function dittoSmallPeerInfoSetSyncScope(e, t) {
  return ensureInitialized(), ditto_small_peer_info_set_sync_scope(e, t);
}
function dittoSmallPeerInfoGetMetadata(e) {
  ensureInitialized();
  return boxCStringIntoString(ditto_small_peer_info_get_metadata(e));
}
function dittoSmallPeerInfoSetMetadata(e, t) {
  ensureInitialized();
  const n = ditto_small_peer_info_set_metadata(e, bytesFromString(t));
  switch (n) {
    case 0:
      return;
    case -1:
      throw new Error("Internal inconsistency, the observability subsystem is unavailable.");
    case 1:
      throw new Error(`Validation error, size limit exceeded: ${errorMessage() || "metadata is too big"}`);
    case 2:
      throw new Error(`Validation error, ${errorMessage() || "depth limit for metadata object exceeded"}`);
    case 3:
      throw new Error(`Validation error, ${errorMessage() || `'${t}' is not a valid JSON object`}`);
    default:
      throw new Error(errorMessage() || `Internal inconsistency, ditto_small_peer_info_set_metadata() returned an unknown error code: ${n}`);
  }
}
function dittoRegisterTransportConditionChangedCallback(e, t) {
  ensureInitialized(), ditto_register_transport_condition_changed_callback(e, t ? wrapBackgroundCbForFFI((e2) => log("Error", `The registered "transport condition changed" callback errored with ${e2}`), t) : null);
}
function dittoSetDeviceName(e, t) {
  ensureInitialized();
  return boxCStringIntoString(ditto_set_device_name(e, bytesFromString(t)));
}
async function dittoNewAttachmentFromBytes(e, t) {
  ensureInitialized();
  const n = {}, r = await ditto_new_attachment_from_bytes(e, t, n);
  if (0 !== r) throw new DittoFFIError(r, null, `ditto_new_attachment_from_bytes() failed with error code: ${r}`);
  return n;
}
async function dittoResolveAttachment(e, t, n, r) {
  ensureInitialized();
  const { onComplete: i, onProgress: o, onDelete: a } = n, s = wrapBackgroundCbForFFI(r, i), c = wrapBackgroundCbForFFI(r, o), l = wrapBackgroundCbForFFI(r, a), { status_code: u, cancel_token: d } = await ditto_resolve_attachment(e, t, s, c, l);
  if (0 !== u) throw new DittoFFIError(u, null, `ditto_resolve_attachment() failed with error code: ${u}`);
  return d;
}
function dittoCancelResolveAttachment(e, t, n) {
  ensureInitialized();
  const r = ditto_cancel_resolve_attachment(e, t, n);
  if (0 !== r) throw new Error(errorMessage() || `ditto_cancel_resolve_attachment() failed with error code: ${r}`);
}
function freeAttachmentHandle(e) {
  ensureInitialized(), ditto_free_attachment_handle(e);
}
async function dittoGetCompleteAttachmentData(e, t) {
  ensureInitialized();
  const { status: n, data: r } = await ditto_get_complete_attachment_data(e, t);
  if (0 !== n) throw new Error(errorMessage() || `\`ditto_get_complete_attachment_data()\` failed with error code: ${n}`);
  return boxCBytesIntoBuffer(r);
}
function dittoGetSDKVersion(e) {
  ensureInitialized();
  return boxCStringIntoString(ditto_get_sdk_version());
}
function dittoGetSDKSemver() {
  ensureInitialized();
  return boxCStringIntoString(dittoffi_get_sdk_semver());
}
function dittoPresenceV1(e) {
  ensureInitialized();
  return boxCStringIntoString(ditto_presence_v1(e));
}
function dittoPresenceV3(e) {
  ensureInitialized();
  return boxCStringIntoString(ditto_presence_v3(e));
}
async function dittoShutdown(e) {
  return ensureInitialized(), await ditto_shutdown(e);
}
async function dittoRunGarbageCollection(e) {
  ensureInitialized();
  const t = await ditto_run_garbage_collection(e);
  if (0 !== t) throw new Error(errorMessage() || `ditto_run_garbage_collection() failed with error code: ${t}`);
}
async function dittoDisableSyncWithV3(e) {
  ensureInitialized();
  const t = await ditto_disable_sync_with_v3(e);
  if (0 !== t) throw new Error(errorMessage() || `ditto_disable_sync_with_v3() failed with error code: ${t}`);
}
function documentsHash(e) {
  ensureInitialized();
  const { status_code: t, u64: n } = ditto_documents_hash(e);
  if (0 !== t) throw new Error(errorMessage() || `\`ditto_documents_hash()\` failed with error code: ${t}`);
  return BigInt(n);
}
function documentsHashMnemonic(e) {
  ensureInitialized();
  const { status_code: t, c_string: n } = ditto_documents_hash_mnemonic(e);
  if (0 !== t) throw new Error(errorMessage() || `\`ditto_documents_hash_mnemonic()\` failed with error code: ${t}`);
  return boxCStringIntoString(n);
}
function base64encode(e, t) {
  return boxCStringIntoString(dittoffi_base64_encode(e, t));
}
function tryBase64Decode(e, t) {
  const n = dittoffi_try_base64_decode(bytesFromString(e), t);
  return throwOnErrorResult(n.error, "dittoffi_try_base64_decode"), boxCBytesIntoBuffer(n.success);
}
async function dittoAuthSetLoginProvider(e, t) {
  return ensureInitialized(), await ditto_auth_set_login_provider(e, t);
}
function dittoAuthClientMakeLoginProvider(e, t) {
  return ensureInitialized(), ditto_auth_client_make_login_provider(wrapBackgroundCbForFFI(t, e));
}
function transportsInit() {
  ensureInitialized();
}
!function(e) {
  e[e.counter = 0] = "counter", e[e.register = 1] = "register", e[e.attachment = 2] = "attachment", e[e.rga = 3] = "rga", e[e.rwMap = 4] = "rwMap";
}(DittoCRDTType || (DittoCRDTType = {}));
var isInitialized$1 = false;
async function init$1(e) {
  e ? await init$2(e) : await init$2(), isInitialized$1 = true;
}
function initSDKVersion(e, t, n) {
  ensureInitialized(), bytesFromString(e), bytesFromString(t);
  const r = ditto_init_sdk_version(e, t, bytesFromString(n));
  if (void 0 !== r && 0 !== r) throw new Error(errorMessage() || `ditto_init_sdk_version() failed with error code: ${r}`);
}
function tryVerifyLicense(e, t) {
  ensureInitialized();
  throwOnErrorResult(dittoffi_try_verify_license(e, bytesFromString(t)).error, "dittoffi_try_verify_license");
}
var NOT_FOUND_ERROR_CODE = -30798;
function wrapBackgroundCbForFFI(e, t) {
  const n = null != e ? e : (e2) => log("Error", `The registered callback failed with ${e2}`);
  return (e2, ...r) => {
    let i;
    try {
      i = t(...r);
    } catch (e3) {
      try {
        n(e3);
      } catch (e4) {
        log("Error", `Internal error: \`onError()\` handler oughtn't throw, but it did throw ${e4}`);
      }
    }
    return e2(i);
  };
}
function wrapAsyncBackgroundCbForFFI(e, t) {
  const n = null != e ? e : (e2) => log("Error", `The registered callback failed with ${e2}`);
  return async (e2, ...r) => {
    let i;
    try {
      i = await t(...r);
    } catch (e3) {
      try {
        n(e3);
      } catch (e4) {
        log("Error", `Internal error: \`onError()\` handler oughtn't throw, but it did throw ${e4}`);
      }
    }
    return e2(i);
  };
}
function bytesFromString(e) {
  if (void 0 === e) return;
  if (null === e) return null;
  if ("string" != typeof e) throw new Error(`Can't convert string to Uint8Array, not a string: ${e}`);
  return new TextEncoder().encode(`${e}\0`);
}
function errorMessage() {
  ensureInitialized();
  return boxCStringIntoString(ditto_error_message());
}
function ensureInitialized() {
  if (!isInitialized$1) throw new Error("Ditto needs to be initialized before using any of its API, please make sure to call `await init()` first.");
}
var ERROR_CODES = { internal: "An unexpected internal error occurred. Please get in touch with Ditto customer service to report this incident.", "internal/unknown-error": "An unexpected internal error occurred. Please get in touch with Ditto customer service to report this incident.", "sdk/unsupported": "The feature is not supported by the current environment.", "authentication/failed-to-authenticate": "Ditto failed to authenticate.", "io/already-exists": "A file or directory already exists.", "io/not-found": "A file or directory could not be found.", "io/permission-denied": "The operation failed due to insufficient permissions.", "io/operation-failed": "The operation failed.", "query/arguments-invalid": "The query arguments were invalid.", "query/evaluation": "The query could not be evaluated.", "query/execution": "The query could not be executed.", "query/invalid": "The query was invalid.", "query/unsupported": "The query contains unsupported features.", "query/parameter": "The query to update system parameters failed.", "store/backend": "An error occurred with the storage backend.", "store/crdt": "An error occurred processing a CRDT.", "store/document-not-found": "The document with the provided ID could not be found.", "store/document-id": "The document ID is invalid.", "store/attachment-file-permission-denied": "Permission has been denied for a file operation when working with attachments.", "store/attachment-file-not-found": "The source file for the attachment does not exist.", "store/attachment-not-found": "The attachment could not be found.", "store/attachment-token-invalid": "The attachment token is invalid.", "store/failed-to-create-attachment": "The attachment could not be created.", "store/failed-to-fetch-attachment": "The attachment could not be fetched.", "activation/license-token-verification-failed": "Please provide a valid license token.", "activation/license-token-expired": "The license token expired. Please renew it.", "activation/license-token-unsupported-future-version": "The provided license token is in an unsupported future format.", "activation/not-activated": "The operation failed because the Ditto instance has not yet been activated.", "activation/unnecessary": "Activation is unnecessary for this Ditto instance, because of its identity.", "validation/depth-limit-exceeded": "The maximum depth limit has been exceeded.", "validation/invalid-cbor": "The value provided is not valid CBOR.", "validation/invalid-json": "The value provided is not valid JSON.", "validation/invalid-transport-config": "The TransportConfig is invalid for the active platform.", "validation/not-an-object": "The value provided is not of type object.", "validation/not-json-compatible": "Value is not serializable as JSON.", "validation/size-limit-exceeded": "The size limit has been exceeded." };
var DEFAULT_STATUS_CODE_MAPPING = { ActivationLicenseTokenExpired: ["activation/license-token-expired"], ActivationLicenseTokenInvalid: ["activation/license-token-verification-failed"], ActivationLicenseUnsupportedFutureVersion: ["activation/license-token-unsupported-future-version"], ActivationNotActivated: ["activation/not-activated"], ActivationUnnecessary: ["activation/unnecessary"], IoAlreadyExists: ["io/already-exists"], IoNotFound: ["io/not-found"], IoPermissionDenied: ["io/permission-denied"], IoOperationFailed: ["io/operation-failed"], JsFloatingStoreOperation: ["internal", "Internal inconsistency, an outstanding store operation was not awaited."], DqlEvaluationError: ["query/evaluation"], DqlQueryCompilation: ["query/invalid"], DqlInvalidQueryArgs: ["query/arguments-invalid"], DqlUnsupported: ["query/unsupported"], StoreQuery: ["query/execution"], ParameterQuery: ["query/parameter"], StoreDatabase: ["store/backend"], StoreDocumentId: ["store/document-id"], StoreDocumentNotFound: ["store/document-not-found"], Crdt: ["store/crdt"], Base64Invalid: ["internal", "Invalid base64 encoding."], CborInvalid: ["internal", "Invalid CBOR encoding."], CborUnsupported: ["internal", "Unsupported CBOR encoding."], ValidationDepthLimitExceeded: ["validation/depth-limit-exceeded"], ValidationInvalidCbor: ["validation/invalid-cbor"], ValidationInvalidJson: ["validation/invalid-json"], ValidationInvalidTransportConfig: ["validation/invalid-transport-config"], ValidationNotAMap: ["validation/not-an-object"], ValidationSizeLimitExceeded: ["validation/size-limit-exceeded"], LockedDittoWorkingDirectory: ["internal", "Ditto working directory is locked."], Transport: ["internal", "Transport error."], Unsupported: ["sdk/unsupported"], Unknown: ["internal/unknown-error"], default: ["internal/unknown-error"] };
var DittoError = class _DittoError extends Error {
  constructor(e, t, n = {}) {
    if (null == ERROR_CODES[e]) throw new _DittoError("internal", `Invalid error code: ${e}`);
    super(t || ERROR_CODES[e]), this.code = "internal", this.code = e, this.context = Object.freeze({ ...n });
  }
  static fromFFIError(e, t, n, r) {
    const i = n || e.message, o = { coreError: e.code, coreErrorMessage: e.message, ...r }, a = new _DittoError(t, i, o);
    return null != e.stack && (a.stack = e.stack), a;
  }
};
function mapFFIErrors(e, t, n) {
  try {
    return e();
  } catch (e2) {
    if (e2 instanceof DittoFFIError) throw translateFFIError(e2, t, n);
    throw e2;
  }
}
async function mapFFIErrorsAsync(e, t, n) {
  try {
    return await e();
  } catch (e2) {
    if (e2 instanceof DittoFFIError) throw translateFFIError(e2, t, n);
    throw e2;
  }
}
var translateFFIError = (e, t, n) => {
  var r;
  const i = e.code.toString();
  let o, a;
  return null != t && null != t[i] ? [o, a] = t[i] : [o, a] = null !== (r = DEFAULT_STATUS_CODE_MAPPING[i]) && void 0 !== r ? r : DEFAULT_STATUS_CODE_MAPPING.default, DittoError.fromFFIError(e, o, a, n);
};
var AttachmentToken = class _AttachmentToken {
  constructor(e) {
    let t, n, r;
    null != e[DittoCRDTTypeKey] ? { id: t, len: n, meta: r } = _AttachmentToken.validateTypedInput(e) : { id: t, len: n, meta: r } = _AttachmentToken.validateUntypedInput(e), this.id = mapFFIErrors(() => base64encode(t, "Unpadded")), this.idBytes = t, this.len = n, this.metadata = r;
  }
  static validateTypedInput(e) {
    if (e[DittoCRDTTypeKey] !== DittoCRDTType.attachment) throw new Error("Invalid attachment token");
    const t = e._id;
    if (!(t instanceof Uint8Array)) throw new Error("Invalid attachment token id");
    const n = e._len;
    if ("number" != typeof n && "bigint" != typeof n || n < 0) throw new Error("Invalid attachment token length, must be a non-negative number or bigint");
    const r = e._meta;
    if ("object" != typeof r) throw new Error("Invalid attachment token meta");
    return { id: t, len: n, meta: r };
  }
  static validateUntypedInput(e) {
    const t = e.id;
    if ("string" != typeof t) throw new Error("Invalid attachment token id");
    const n = mapFFIErrors(() => tryBase64Decode(t, "Unpadded"), { Base64Invalid: ["store/attachment-token-invalid", "Failed to decode attachment token id from base64 input"] }, { attachmentTokenID: t }), r = e.len;
    if ("number" != typeof r && "bigint" != typeof r || r < 0) throw new Error("Invalid attachment token length, must be a non-negative number or bigint");
    const i = e.metadata;
    if ("object" != typeof i) throw new Error("Invalid attachment token meta");
    return { id: n, len: r, meta: i };
  }
};
var defaultDittoWasmFileURL = "https://software.ditto.live/js/Ditto/4.10.2/ditto.wasm";
var isInitialized = false;
var SDK_NAME = "{custom-sdk-name}".includes("{") ? "JavaScript" : "{custom-sdk-name}";
async function init(e = {}) {
  if (!isInitialized) {
    {
      const t = e.webAssemblyModule || defaultDittoWasmFileURL;
      await init$1(t), initSDKVersion("Web", SDK_NAME, "4.10.2");
    }
    isInitialized = true;
  }
}
var Logger = class {
  static get logFile() {
    return this._logFile;
  }
  static setLogFile(e) {
    e ? (loggerSetLogFile(e), this._logFile = e) : (loggerSetLogFile(void 0), delete this._logFile);
  }
  static setLogFileURL(e) {
    var t;
    this.setLogFile(null !== (t = null == e ? void 0 : e.pathname) && void 0 !== t ? t : null);
  }
  static get enabled() {
    return loggerEnabledGet();
  }
  static set enabled(e) {
    loggerEnabled(e);
  }
  static get emojiLogLevelHeadingsEnabled() {
    return loggerEmojiHeadingsEnabledGet();
  }
  static set emojiLogLevelHeadingsEnabled(e) {
    loggerEmojiHeadingsEnabled(e);
  }
  static get minimumLogLevel() {
    return loggerMinimumLogLevelGet();
  }
  static set minimumLogLevel(e) {
    loggerMinimumLogLevel(e);
  }
  static get customLogCallback() {
    return this._customLogCallback;
  }
  static async setCustomLogCallback(e) {
    if (null != e && "function" != typeof e) throw new TypeError(`Expected parameter 'callback' to be a function or undefined, but got ${typeof e}.`);
    null != e ? (await loggerSetCustomLogCb(e), this._customLogCallback = e) : (await loggerSetCustomLogCb(null), delete this._customLogCallback);
  }
  static async exportToFile(e) {
    if ("string" != typeof e) throw new TypeError(`Expected parameter 'path' to be a string, but got ${typeof e}.`);
    let t = e;
    return mapFFIErrorsAsync(() => loggerTryExportToFileAsync(t));
  }
  static log(e, t) {
    log(e, t);
  }
  static error(e) {
    this.log("Error", e);
  }
  static warning(e) {
    this.log("Warning", e);
  }
  static info(e) {
    this.log("Info", e);
  }
  static debug(e) {
    this.log("Debug", e);
  }
  static verbose(e) {
    this.log("Verbose", e);
  }
  constructor() {
    throw new Error("Logger can't be instantiated, use its static properties & methods directly instead.");
  }
};
var CBOR_OPTIONS = Object.freeze({ dictionary: "object", mode: "strict" });
var EMPTY_KEY = Symbol("EMPTY_KEY");
var OMIT_VALUE = Symbol("OMIT_VALUE");
var POW_2_24 = 5960464477539063e-23;
var POW_2_32 = 4294967296;
var POW_2_53 = 9007199254740992;
var MAX_SAFE_INTEGER = 18446744073709551616n;
function objectIs(e, t) {
  return "function" == typeof Object.is ? Object.is(e, t) : e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
}
function options(e) {
  const t = { ...CBOR_OPTIONS };
  return "object" == typeof e && (t.dictionary = function isDictionary(e2) {
    return "string" == typeof e2 && ["object", "map"].includes(e2);
  }(e.dictionary) ? e.dictionary : CBOR_OPTIONS.dictionary, t.mode = function isMode(e2) {
    return "string" == typeof e2 && ["loose", "strict", "sequence"].includes(e2);
  }(e.mode) ? e.mode : CBOR_OPTIONS.mode), Object.freeze(t);
}
function lexicographicalCompare(e, t) {
  const n = Math.min(e.byteLength, t.byteLength);
  for (let r = 0; r < n; r++) {
    const n2 = e[r] - t[r];
    if (0 !== n2) return n2;
  }
  return e.byteLength - t.byteLength;
}
var _Sequence_instances;
var _Sequence_toInspectString;
var __classPrivateFieldGet = function(e, t, n, r) {
  if ("a" === n && !r) throw new TypeError("Private accessor was defined without a getter");
  if ("function" == typeof t ? e !== t || !r : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return "m" === n ? r : "a" === n ? r.call(e) : r ? r.value : t.get(e);
};
var Sequence = class _Sequence {
  static from(e) {
    return new _Sequence(Array.from(e));
  }
  constructor(e) {
    _Sequence_instances.add(this), Object.defineProperty(this, "_data", { enumerable: true, configurable: true, writable: true, value: void 0 }), this._data = e || [];
  }
  add(e) {
    return this._data.push(e) - 1;
  }
  remove(e) {
    return this._data.splice(e, 1)[0];
  }
  get(e) {
    return this._data[e];
  }
  clone() {
    return new _Sequence(this.data);
  }
  get data() {
    return Array.from(this._data);
  }
  get size() {
    return this._data.length;
  }
  [(_Sequence_instances = /* @__PURE__ */ new WeakSet(), Symbol.toStringTag)]() {
    return "Sequence";
  }
  [(_Sequence_toInspectString = function _Sequence_toInspectString2(e) {
    return `${this[Symbol.toStringTag]()}(${this.size}) ${e(this._data)}`;
  }, Symbol.for("Deno.customInspect"))](e) {
    return __classPrivateFieldGet(this, _Sequence_instances, "m", _Sequence_toInspectString).call(this, e);
  }
  [Symbol.for("nodejs.util.inspect.custom")](e, t, n) {
    return __classPrivateFieldGet(this, _Sequence_instances, "m", _Sequence_toInspectString).call(this, n);
  }
};
var SimpleValue = class _SimpleValue {
  static create(e) {
    if (void 0 === e) return new _SimpleValue(23);
    if (null === e) return new _SimpleValue(22);
    if (true === e) return new _SimpleValue(21);
    if (false === e) return new _SimpleValue(20);
    if ("number" == typeof e && e >= 0 && e <= 255) return new _SimpleValue(e);
    throw new Error("CBORError: Value out of range or not a simple value.");
  }
  constructor(e) {
    switch (Object.defineProperty(this, "semantic", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "value", { enumerable: true, configurable: true, writable: true, value: void 0 }), true) {
      case 20 === e:
        this.semantic = "false";
        break;
      case 21 === e:
        this.semantic = "true";
        break;
      case 22 === e:
        this.semantic = "null";
        break;
      case 23 === e:
        this.semantic = "undefined";
        break;
      case (e > 23 && e < 32):
        this.semantic = "reserved";
        break;
      default:
        this.semantic = "unassigned";
    }
    this.value = e;
  }
  toPrimitive() {
    switch (this.semantic) {
      case "false":
        return false;
      case "true":
        return true;
      case "null":
        return null;
      default:
        return;
    }
  }
};
var TaggedValue = class {
  constructor(e, t) {
    Object.defineProperty(this, "value", { enumerable: true, configurable: true, writable: true, value: void 0 }), Object.defineProperty(this, "tag", { enumerable: true, configurable: true, writable: true, value: void 0 }), this.value = e, this.tag = t;
  }
};
function decode(e, t, n = {}) {
  const { dictionary: r, mode: i } = options(n), o = "sequence" === i || "strict" === i, a = new DataView(e), s = new Uint8Array(e);
  let c = 0, reviverFunction = function(e2, t2) {
    return t2;
  };
  function commitRead(e2, t2) {
    return c += e2, t2;
  }
  function readArrayBuffer(t2) {
    return commitRead(t2, new Uint8Array(e, c, t2));
  }
  function readUint8() {
    return commitRead(1, s[c]);
  }
  function readUint16() {
    return commitRead(2, a.getUint16(c));
  }
  function readBreak() {
    return 255 === s[c] && (c += 1, true);
  }
  function readLength(e2) {
    if (e2 < 24) return e2;
    if (24 === e2) return readUint8();
    if (25 === e2) return readUint16();
    if (26 === e2) return function readUint32() {
      return commitRead(4, a.getUint32(c));
    }();
    if (27 === e2) {
      const e3 = function readUint64() {
        return commitRead(8, a.getBigUint64(c));
      }();
      return e3 < POW_2_53 ? Number(e3) : e3;
    }
    if (31 === e2) return -1;
    throw new Error("CBORError: Invalid length encoding");
  }
  function readIndefiniteStringLength(e2) {
    const t2 = readUint8();
    if (255 === t2) return -1;
    const n2 = readLength(31 & t2);
    if (n2 < 0 || t2 >> 5 !== e2) throw new Error("CBORError: Invalid indefinite length element");
    return Number(n2);
  }
  function appendUtf16Data(e2, t2) {
    for (let n2 = 0; n2 < t2; ++n2) {
      let n3 = readUint8();
      128 & n3 && (n3 < 224 ? (n3 = (31 & n3) << 6 | 63 & readUint8(), t2 -= 1) : n3 < 240 ? (n3 = (15 & n3) << 12 | (63 & readUint8()) << 6 | 63 & readUint8(), t2 -= 2) : (n3 = (15 & n3) << 18 | (63 & readUint8()) << 12 | (63 & readUint8()) << 6 | 63 & readUint8(), t2 -= 3)), n3 < 65536 ? e2.push(n3) : (n3 -= 65536, e2.push(55296 | n3 >> 10), e2.push(56320 | 1023 & n3));
    }
  }
  function decodeItem() {
    const e2 = readUint8(), t2 = e2 >> 5, n2 = 31 & e2;
    let i2, s2;
    if (7 === t2) switch (n2) {
      case 25:
        return function readFloat16() {
          const e3 = new ArrayBuffer(4), t3 = new DataView(e3), n3 = readUint16(), r2 = 32768 & n3;
          let i3 = 31744 & n3;
          const o2 = 1023 & n3;
          if (31744 === i3) i3 = 261120;
          else if (0 !== i3) i3 += 114688;
          else if (0 !== o2) return (r2 ? -1 : 1) * o2 * POW_2_24;
          return t3.setUint32(0, r2 << 16 | i3 << 13 | o2 << 13), t3.getFloat32(0);
        }();
      case 26:
        return function readFloat32() {
          return commitRead(4, a.getFloat32(c));
        }();
      case 27:
        return function readFloat64() {
          return commitRead(8, a.getFloat64(c));
        }();
    }
    if (s2 = readLength(n2), s2 < 0 && (t2 < 2 || 6 < t2)) throw new Error("CBORError: Invalid length");
    switch (t2) {
      case 0:
        return reviverFunction(EMPTY_KEY, s2);
      case 1:
        return reviverFunction(EMPTY_KEY, "number" == typeof s2 ? -1 - s2 : -1n - s2);
      case 2:
        if (s2 < 0) {
          const e3 = [];
          let n3 = 0;
          for (; (s2 = readIndefiniteStringLength(t2)) >= 0; ) n3 += s2, e3.push(readArrayBuffer(s2));
          const r2 = new Uint8Array(n3);
          let o2 = 0;
          for (i2 = 0; i2 < e3.length; ++i2) r2.set(e3[i2], o2), o2 += e3[i2].length;
          return reviverFunction(EMPTY_KEY, r2);
        }
        return reviverFunction(EMPTY_KEY, readArrayBuffer(s2));
      case 3: {
        const e3 = [];
        if (s2 < 0) for (; (s2 = readIndefiniteStringLength(t2)) >= 0; ) appendUtf16Data(e3, s2);
        else appendUtf16Data(e3, s2);
        let n3 = "";
        for (i2 = 0; i2 < e3.length; i2 += 8192) n3 += String.fromCharCode.apply(null, e3.slice(i2, i2 + 8192));
        return reviverFunction(EMPTY_KEY, n3);
      }
      case 4: {
        let e3;
        if (s2 < 0) {
          e3 = [];
          let t3 = 0;
          for (; !readBreak(); ) e3.push(reviverFunction(t3++, decodeItem()));
        } else for (e3 = new Array(s2), i2 = 0; i2 < s2; ++i2) e3[i2] = reviverFunction(i2, decodeItem());
        return reviverFunction(EMPTY_KEY, e3);
      }
      case 5: {
        if ("map" === r) {
          const e4 = /* @__PURE__ */ new Map();
          for (i2 = 0; i2 < s2 || s2 < 0 && !readBreak(); ++i2) {
            const t3 = decodeItem();
            if (o && e4.has(t3)) throw new Error("CBORError: Duplicate key encountered");
            e4.set(t3, reviverFunction(t3, decodeItem()));
          }
          return reviverFunction(EMPTY_KEY, e4);
        }
        const e3 = {};
        for (i2 = 0; i2 < s2 || s2 < 0 && !readBreak(); ++i2) {
          const t3 = decodeItem();
          if (o && Object.prototype.hasOwnProperty.call(e3, t3)) throw new Error("CBORError: Duplicate key encountered");
          e3[t3] = reviverFunction(t3, decodeItem());
        }
        return reviverFunction(EMPTY_KEY, e3);
      }
      case 6: {
        const e3 = decodeItem(), t3 = s2;
        if (e3 instanceof Uint8Array) {
          const n3 = e3.buffer.slice(e3.byteOffset, e3.byteLength + e3.byteOffset);
          switch (t3) {
            case 64:
              return reviverFunction(EMPTY_KEY, new Uint8Array(n3));
            case 72:
              return reviverFunction(EMPTY_KEY, new Int8Array(n3));
            case 69:
              return reviverFunction(EMPTY_KEY, new Uint16Array(n3));
            case 77:
              return reviverFunction(EMPTY_KEY, new Int16Array(n3));
            case 70:
              return reviverFunction(EMPTY_KEY, new Uint32Array(n3));
            case 78:
              return reviverFunction(EMPTY_KEY, new Int32Array(n3));
            case 85:
              return reviverFunction(EMPTY_KEY, new Float32Array(n3));
            case 86:
              return reviverFunction(EMPTY_KEY, new Float64Array(n3));
          }
        }
        return reviverFunction(EMPTY_KEY, new TaggedValue(e3, t3));
      }
      case 7:
        switch (s2) {
          case 20:
            return reviverFunction(EMPTY_KEY, false);
          case 21:
            return reviverFunction(EMPTY_KEY, true);
          case 22:
            return reviverFunction(EMPTY_KEY, null);
          case 23:
            return reviverFunction(EMPTY_KEY, void 0);
          default:
            return reviverFunction(EMPTY_KEY, new SimpleValue(s2));
        }
    }
  }
  "function" == typeof t && (reviverFunction = t);
  const l = decodeItem();
  if (c !== e.byteLength) {
    if ("sequence" !== i) throw new Error("CBORError: Remaining bytes");
    const t2 = new Sequence([l]);
    for (; c < e.byteLength; ) t2.add(reviverFunction(EMPTY_KEY, decodeItem()));
    return t2;
  }
  return "sequence" === i ? new Sequence([l]) : l;
}
function parse(e, t, n) {
  return decode(e, t, n);
}
function encode(e, t) {
  let n, r = new ArrayBuffer(256), i = new DataView(r), o = new Uint8Array(r), a = 0, replacerFunction = (e2, t2) => t2;
  if ("function" == typeof t && (replacerFunction = t), Array.isArray(t)) {
    const e2 = t.slice();
    replacerFunction = (t2, n2) => t2 === EMPTY_KEY || e2.includes(t2) ? n2 : OMIT_VALUE;
  }
  function prepareWrite(e2) {
    let t2 = r.byteLength;
    const s2 = a + e2;
    for (; t2 < s2; ) t2 <<= 1;
    if (t2 !== r.byteLength) {
      const e3 = i;
      r = new ArrayBuffer(t2), i = new DataView(r), o = new Uint8Array(r);
      const n2 = a + 3 >> 2;
      for (let t3 = 0; t3 < n2; ++t3) i.setUint32(t3 << 2, e3.getUint32(t3 << 2));
    }
    return n = e2, i;
  }
  function commitWrite(...e2) {
    a += n;
  }
  function writeUint8(e2) {
    commitWrite(prepareWrite(1).setUint8(a, e2));
  }
  function writeUint8Array(e2) {
    prepareWrite(e2.length), o.set(e2, a), commitWrite();
  }
  function writeUint16(e2) {
    commitWrite(prepareWrite(2).setUint16(a, e2));
  }
  function writeUint32(e2) {
    commitWrite(prepareWrite(4).setUint32(a, e2));
  }
  function writeUint64(e2) {
    const t2 = e2 % POW_2_32, n2 = (e2 - t2) / POW_2_32, r2 = prepareWrite(8);
    r2.setUint32(a, n2), r2.setUint32(a + 4, t2), commitWrite();
  }
  function writeBigUint64(e2) {
    commitWrite(prepareWrite(8).setBigUint64(a, e2));
  }
  function writeVarUint(e2, t2) {
    e2 <= 255 ? e2 < 24 ? writeUint8(Number(e2) | t2) : (writeUint8(24 | t2), writeUint8(Number(e2))) : e2 <= 65535 ? (writeUint8(25 | t2), writeUint16(Number(e2))) : e2 <= 4294967295 ? (writeUint8(26 | t2), writeUint32(Number(e2))) : (writeUint8(27 | t2), "number" == typeof e2 ? writeUint64(e2) : writeBigUint64(e2));
  }
  function writeTypeAndLength(e2, t2) {
    t2 < 24 ? writeUint8(e2 << 5 | t2) : t2 < 256 ? (writeUint8(e2 << 5 | 24), writeUint8(t2)) : t2 < 65536 ? (writeUint8(e2 << 5 | 25), writeUint16(t2)) : t2 < 4294967296 ? (writeUint8(e2 << 5 | 26), writeUint32(t2)) : (writeUint8(e2 << 5 | 27), writeUint64(t2));
  }
  function encodeItem(e2) {
    if (e2 !== OMIT_VALUE) {
      if (false === e2) return writeUint8(244);
      if (true === e2) return writeUint8(245);
      if (null === e2) return writeUint8(246);
      if (void 0 === e2) return writeUint8(247);
      if (objectIs(e2, -0)) return writeUint8Array([249, 128, 0]);
      switch (typeof e2) {
        case "bigint":
          return function writeBigInteger(e3) {
            let t2 = 0;
            if (0 <= e3 && e3 <= MAX_SAFE_INTEGER) t2 = 0;
            else {
              if (!(-MAX_SAFE_INTEGER <= e3 && e3 < 0)) throw new Error("CBORError: Encountered unsafe integer outside of valid CBOR range.");
              t2 = 1, e3 = -(e3 + 1n);
            }
            if (e3 < 0x100000000n) return writeTypeAndLength(t2, Number(e3));
            writeUint8(t2 << 5 | 27), writeBigUint64(e3);
          }(e2);
        case "number":
          if (Math.floor(e2) === e2) {
            if (0 <= e2 && e2 <= POW_2_53) return writeTypeAndLength(0, e2);
            if (-POW_2_53 <= e2 && e2 < 0) return writeTypeAndLength(1, -(e2 + 1));
          }
          return writeUint8(251), function writeFloat64(e3) {
            commitWrite(prepareWrite(8).setFloat64(a, e3));
          }(e2);
        case "string": {
          const t2 = [], n2 = e2.length;
          for (let r2 = 0; r2 < n2; ++r2) {
            let n3 = e2.charCodeAt(r2);
            n3 < 128 ? t2.push(n3) : n3 < 2048 ? (t2.push(192 | n3 >> 6), t2.push(128 | 63 & n3)) : n3 < 55296 || n3 >= 57344 ? (t2.push(224 | n3 >> 12), t2.push(128 | n3 >> 6 & 63), t2.push(128 | 63 & n3)) : (n3 = (1023 & n3) << 10, n3 |= 1023 & e2.charCodeAt(++r2), n3 += 65536, t2.push(240 | n3 >> 18), t2.push(128 | n3 >> 12 & 63), t2.push(128 | n3 >> 6 & 63), t2.push(128 | 63 & n3));
          }
          return writeTypeAndLength(3, t2.length), writeUint8Array(t2);
        }
        default: {
          let t2;
          if (Array.isArray(e2)) !function writeArray(e3) {
            const t3 = a, n2 = e3.length;
            let r2 = 0;
            writeTypeAndLength(4, n2);
            const i2 = a;
            for (let t4 = 0; t4 < n2; t4 += 1) {
              const n3 = replacerFunction(t4, e3[t4]);
              n3 !== OMIT_VALUE && (encodeItem(n3), r2 += 1);
            }
            if (n2 > r2) {
              const e4 = o.slice(i2, a);
              a = t3, writeTypeAndLength(4, r2), writeUint8Array(e4);
            }
          }(e2);
          else if (e2 instanceof Uint8Array) writeVarUint(64, 192), writeTypeAndLength(2, e2.length), writeUint8Array(e2);
          else if (e2 instanceof Int8Array) writeVarUint(72, 192), writeTypeAndLength(2, e2.byteLength), writeUint8Array(new Uint8Array(e2.buffer));
          else if (e2 instanceof Uint16Array) writeVarUint(69, 192), writeTypeAndLength(2, e2.byteLength), writeUint8Array(new Uint8Array(e2.buffer));
          else if (e2 instanceof Int16Array) writeVarUint(77, 192), writeTypeAndLength(2, e2.byteLength), writeUint8Array(new Uint8Array(e2.buffer));
          else if (e2 instanceof Uint32Array) writeVarUint(70, 192), writeTypeAndLength(2, e2.byteLength), writeUint8Array(new Uint8Array(e2.buffer));
          else if (e2 instanceof Int32Array) writeVarUint(78, 192), writeTypeAndLength(2, e2.byteLength), writeUint8Array(new Uint8Array(e2.buffer));
          else if (e2 instanceof Float32Array) writeVarUint(85, 192), writeTypeAndLength(2, e2.byteLength), writeUint8Array(new Uint8Array(e2.buffer));
          else if (e2 instanceof Float64Array) writeVarUint(86, 192), writeTypeAndLength(2, e2.byteLength), writeUint8Array(new Uint8Array(e2.buffer));
          else if (ArrayBuffer.isView(e2)) t2 = new Uint8Array(e2.buffer), writeTypeAndLength(2, t2.length), writeUint8Array(t2);
          else if (e2 instanceof ArrayBuffer || "function" == typeof SharedArrayBuffer && e2 instanceof SharedArrayBuffer) t2 = new Uint8Array(e2), writeTypeAndLength(2, t2.length), writeUint8Array(t2);
          else if (e2 instanceof TaggedValue) writeVarUint(e2.tag, 192), encodeItem(e2.value);
          else if (e2 instanceof SimpleValue) writeTypeAndLength(7, e2.value);
          else if (e2 instanceof Sequence) {
            if (0 !== a) throw new Error("CBORError: A CBOR Sequence may not be nested.");
            const t3 = e2.size;
            for (let n2 = 0; n2 < t3; n2 += 1) encodeItem(e2.get(n2));
          } else !function writeDictionary(e3) {
            const t3 = [], n2 = a;
            let r2 = a, i2 = 0, s2 = 0;
            if (e3 instanceof Map) {
              i2 = e3.size, writeTypeAndLength(5, i2), r2 = a;
              for (const [n3, r3] of e3.entries()) {
                const e4 = replacerFunction(n3, r3);
                if (e4 === OMIT_VALUE) continue;
                let i3 = a;
                encodeItem(n3);
                const c2 = o.slice(i3, a);
                i3 = a, encodeItem(e4);
                const l = o.slice(i3, a);
                s2 += 1, t3.push([c2, l]);
              }
            } else {
              const n3 = Object.keys(e3);
              i2 = n3.length, writeTypeAndLength(5, i2), r2 = a;
              for (let r3 = 0; r3 < i2; r3 += 1) {
                const i3 = n3[r3], c2 = replacerFunction(i3, e3[i3]);
                if (c2 === OMIT_VALUE) continue;
                let l = a;
                encodeItem(i3);
                const u = o.slice(l, a);
                l = a, encodeItem(c2);
                const d = o.slice(l, a);
                s2 += 1, t3.push([u, d]);
              }
            }
            function sortEncodedKeys(e4) {
              a = n2, writeTypeAndLength(5, s2), t3.sort(([e5], [t4]) => lexicographicalCompare(e5, t4));
              for (let n3 = 0; n3 < e4; n3 += 1) {
                const [e5, r3] = t3[n3];
                writeUint8Array(e5), writeUint8Array(r3);
              }
            }
            if (i2 > s2) {
              const e4 = t3.length;
              if (e4 > 1) sortEncodedKeys(e4);
              else {
                const e5 = o.slice(r2, a);
                a = n2, writeTypeAndLength(5, s2), writeUint8Array(e5);
              }
            } else {
              const e4 = t3.length;
              e4 > 1 && sortEncodedKeys(e4);
            }
          }(e2);
        }
      }
    }
  }
  if (encodeItem(replacerFunction(EMPTY_KEY, e)), "slice" in r) return r.slice(0, a);
  const s = new ArrayBuffer(a), c = new DataView(s);
  for (let e2 = 0; e2 < a; ++e2) c.setUint8(e2, i.getUint8(e2));
  return s;
}
function binarify(e, t) {
  return encode(e, t);
}
var CBOR$1 = { binarify, decode, encode, parse };
var CBOR = class {
  static encode(e) {
    const t = CBOR$1.encode(e);
    return new Uint8Array(t);
  }
  static decode(e, t) {
    const n = e.buffer;
    return CBOR$1.decode(n, t);
  }
};
var DocumentID = class {
  get value() {
    let e = this["@ditto.value"];
    return void 0 === e && (e = CBOR.decode(this["@ditto.cbor"]), this["@ditto.value"] = e), e;
  }
  constructor(e, t = false, n = false) {
    const r = t ? e : CBOR.encode(e), i = n ? r : validateDocumentIDCBOR(r);
    if (!i) throw new Error(`Can't create DocumentID, passed in value is not valid: ${e}`);
    this.isValidated = !n, this["@ditto.cbor"] = i;
  }
  equals(e) {
    const t = this["@ditto.cbor"], n = e["@ditto.cbor"];
    if (t === n) return true;
    if (!(t instanceof Uint8Array)) return false;
    if (!(n instanceof Uint8Array)) return false;
    if (t.length !== n.length) return false;
    for (let e2 = 0; e2 < t.length; e2 += 1) if (t[e2] !== n[e2]) return false;
    return true;
  }
  toString() {
    return documentIDQueryCompatible(this["@ditto.cbor"], "WithoutQuotes");
  }
  toBase64String() {
    return mapFFIErrors(() => base64encode(this["@ditto.cbor"], "Padded"));
  }
  toQueryCompatibleString() {
    return documentIDQueryCompatible(this["@ditto.cbor"], "WithQuotes");
  }
  toCBOR() {
    return this["@ditto.cbor"];
  }
};
function validateDocumentIDValue(e) {
  if (void 0 === e) throw new Error(`Invalid document ID: ${e}`);
  return e;
}
function validateDocumentIDCBOR(e) {
  const t = validateDocumentID(e);
  return null != t ? t : e;
}
var _a;
var DEBUG_TYPE_NAMES = [];
var Handle = class {
  constructor(e, t, n) {
    this.isClosed = false, this.isFinalized = false, this.isUnregistered = false, this.bridge = e, this.objectWeakRef = new WeakRef(t), this.pointer = n;
  }
  get type() {
    return this.bridge.type;
  }
  deref() {
    if (this.isClosed) throw new Error("Bridging error: can't get pointer for an object that has been closed.");
    if (this.isFinalized) throw new Error("Bridging error: can't get pointer for an object that has been finalized.");
    if (this.isUnregistered) throw new Error("Bridging error: can't get pointer for an object that has been unregistered.");
    return this.pointer;
  }
  derefOrNull() {
    var e;
    return this.isClosed || this.isFinalized || this.isUnregistered ? null : null !== (e = this.pointer) && void 0 !== e ? e : null;
  }
  object() {
    const e = this.objectWeakRef.deref();
    if (null == e) throw new Error(`Bridging error: ${this.bridge.type.name} object has been garbage collected.`);
    if (this.isClosed) throw new Error(`Bridging error: ${this.bridge.type.name} object has been closed.`);
    if (this.isUnregistered) throw new Error(`Bridging error: ${this.bridge.type.name} object has been unregistered.`);
    return e;
  }
  objectOrNull() {
    var e;
    return null !== (e = this.objectWeakRef.deref()) && void 0 !== e ? e : null;
  }
  toString() {
    const e = this.derefOrNull();
    return `{ Handle | type: ${this.bridge.type}, object: ${this.objectWeakRef.deref()}, FFI address: ${null == e ? void 0 : e.addr}, FFI type: ${null == e ? void 0 : e.type} }`;
  }
  bridgeWillClose() {
    this.isClosed = true;
  }
  bridgeDidClose() {
    this.pointer = null;
  }
  bridgeWillFinalize() {
    this.isFinalized = true;
  }
  bridgeDidFinalize() {
    this.pointer = null;
  }
  bridgeWillUnregister() {
    this.isUnregistered = true;
  }
  bridgeDidUnregister() {
    this.pointer = null;
  }
};
var Handles = class {
  constructor(e, t) {
    this.handles = t.map((t2) => e.handleFor(t2));
  }
  deref() {
    return this.handles.map((e) => e.deref());
  }
};
var Bridge = class {
  constructor(e) {
    this.internalType = null, this.release = e, this.handlesByAddress = {}, this.handlesByObject = /* @__PURE__ */ new WeakMap(), this.finalizationRegistry = new FinalizationRegistry(this.finalize.bind(this)), _a.all.push(new WeakRef(this));
  }
  get type() {
    if (null == this.internalType) throw new Error("Bridge type has not been registered yet.");
    return this.internalType;
  }
  registerType(e) {
    if (this.internalType !== e) {
      if (this.internalType) throw new Error(`Can't register bridged type '${e.name}', another type was already registered: ${this.internalType}`);
      this.internalType = e;
    }
  }
  handleFor(e) {
    const t = this.handlesByObject.get(e);
    if (null == t) throw new Error(`Bridging error: ${this.type.name} object is not currently registered in this bridge.`);
    return t;
  }
  handlesFor(e) {
    return new Handles(this, e);
  }
  objectFor(e) {
    const t = this.handlesByAddress[e.addr];
    if (t) {
      if (t.type !== this.type) throw new Error(`Can't return object for pointer, pointer is associated with an object of type ${t.type} but this bridge is configured for ${this.type}`);
      return t.object();
    }
  }
  bridge(e, t) {
    const n = this.objectFor(e);
    if (n) return n;
    let r;
    if (t || (t = () => Reflect.construct(this.type, [])), "function" == typeof t) {
      if (r = t(), !(r instanceof this.type)) throw new Error(`Can't bridge, expected passed in create function to return a ${this.type.name} object but got: ${r}`);
    } else r = t;
    return this.register(r, e), r;
  }
  register(e, t) {
    const n = e.constructor;
    if (n !== this.type) throw new Error(`Can't register, bridge is configured for type ${this.type.name} but passed in object is of type ${n.name}`);
    const r = this.handlesByObject.get(e), i = r ? r.pointer : null;
    if (null != i && null != r) throw new Error(`Can't register, an object for the passed in pointer has previously been registered: ${r.object()}`);
    if (null != i && null == r) throw new Error(`Internal inconsistency, trying to register an object which has an associated pointer but no handle entry: ${n.name} at ${i.type} ${i.addr}`);
    if (null == i && null != r) throw new Error(`Internal inconsistency, trying to register an object which has a handle entry but no associated pointer: ${n.name} ${e}`);
    const o = new Handle(this, e, t);
    this.handlesByAddress[t.addr] = o, this.handlesByObject.set(e, o), this.finalizationRegistry.register(e, o, e), DEBUG_TYPE_NAMES.includes(this.type.name) && Logger.debug(`[VERBOSE] Bridge REGISTERED a new instance of ${this.type.name}, current count: ${Object.keys(this.handlesByAddress).length}`);
  }
  unregister(e) {
    const t = e.constructor, n = this.type;
    if (t !== n) throw new Error(`Can't unregister, bridge is configured for type ${n.name} but passed in object is of type ${t.name}`);
    const r = this.handlesByObject.get(e);
    if (null == r) throw new Error(`Can't unregister, object has not been registered before: ${e}`);
    if (r.type !== n) throw new Error(`Internal inconsistency, trying to unregister an object that has a handle with a different type than that of the bridge: ${r}`);
    if (r.objectOrNull() !== e) throw new Error(`Internal inconsistency, trying to unregister an object whose associated handle holds a different object: ${r}`);
    if (r.isClosed) throw new Error(`Can't unregister, object has been closed before: ${e}`);
    if (r.isFinalized) throw new Error(`Can't unregister, object has been finalized before: ${e}`);
    if (r.isUnregistered) throw new Error(`Can't unregister, object has been unregistered already: ${e}`);
    r.bridgeWillUnregister(), this.finalizationRegistry.unregister(e), delete this.handlesByAddress[r.pointer.addr], this.handlesByObject.delete(e), r.bridgeDidUnregister(), DEBUG_TYPE_NAMES.includes(this.type.name) && Logger.debug(`[VERBOSE] Bridge UNREGISTERED an instance of ${this.type.name}, current count: ${Object.keys(this.handlesByAddress).length}`);
  }
  unregisterAll() {
    DEBUG_TYPE_NAMES.includes(this.type.name) && Logger.debug(`[VERBOSE] Unregistering ALL bridged instances of type ${this.type.name}.`);
    for (const e of Object.values(this.handlesByAddress)) {
      const t = e.object();
      t && this.unregister(t);
    }
  }
  async close(e) {
    const t = e.constructor, n = this.type;
    if (t !== n) throw new Error(`Can't close, bridge is configured for type ${n.name} but passed in object is of type ${t.name}`);
    const r = this.handlesByObject.get(e);
    if (null == r) throw new Error(`Can't close an object that has not been registered before: ${e}`);
    if (r.type !== n) throw new Error(`Internal inconsistency, trying to close an object that has a handle with a different type than that of the bridge: ${r}`);
    if (r.isUnregistered) throw new Error("Can't close object, object has been unregistered.");
    if (r.isFinalized) throw new Error("Internal inconsistency, trying to close an object that has already been finalized.");
    if (r.isClosed) return;
    const i = r.pointer;
    if (!i) throw new Error("Internal inconsistency, trying to close an object whose pointer is null.");
    r.bridgeWillClose(), delete this.handlesByAddress[i.addr], await this.release(i), r.bridgeDidClose(), DEBUG_TYPE_NAMES.includes(this.type.name) && Logger.debug(`[VERBOSE] Bridge CLOSED an instance of ${this.type.name}, current count: ${Object.keys(this.handlesByAddress).length}`);
  }
  get count() {
    return Object.keys(this.handlesByAddress).length;
  }
  async finalize(e) {
    if (e.isFinalized) throw new Error("Internal inconsistency, trying to finalize an object that has already been finalized.");
    if (e.isUnregistered) throw new Error("Internal inconsistency, trying to finalize an object that has been unregistered before.");
    if (e.bridgeWillFinalize(), !e.isClosed) {
      const t = e.pointer;
      if (!t) throw new Error("Internal inconsistency, trying to finalize an object whose pointer is null.");
      delete this.handlesByAddress[t.addr], await this.release(t);
    }
    e.bridgeDidFinalize(), DEBUG_TYPE_NAMES.includes(this.type.name) && Logger.debug(`[VERBOSE] Bridge FINALIZED an instance of ${this.type.name}, current count: ${Object.keys(this.handlesByAddress).length}`);
  }
};
_a = Bridge, Bridge.all = [], Bridge.attachment = new _a(freeAttachmentHandle), Bridge.connectionRequest = new _a(connectionRequestFree), Bridge.document = new _a(documentFree), Bridge.mutableDocument = new _a(documentFree), Bridge.queryResult = new _a(queryResultFree), Bridge.queryResultItem = new _a(queryResultItemFree), Bridge.ditto = new _a(async (e) => {
  await dittoClearPresenceCallback(e), await dittoShutdown(e), dittoFree(e);
});
var Attachment = class {
  get id() {
    return this.token.id;
  }
  get len() {
    return this.token.len;
  }
  get metadata() {
    return this.token.metadata;
  }
  data() {
    return this.ditto.deferCloseAsync(async (e) => {
      {
        const t = Bridge.attachment.handleFor(this);
        return await dittoGetCompleteAttachmentData(e.deref(), t.deref());
      }
    });
  }
  getData() {
    return this.data();
  }
  copyToPath(e) {
    return this.ditto.deferCloseAsync(async (e2) => {
      throw new Error("Can't copy attachment to path, not available when running in the browser.");
    });
  }
  constructor(e, t) {
    this.ditto = e, this.token = t;
  }
};
function validateAttachmentMetadata(e) {
  if ("object" != typeof e) throw new DittoError("store/failed-to-create-attachment", `Invalid attachment metadata: expected a value of type object but got ${typeof e}.`);
  for (const t in e) if ("string" != typeof e[t]) throw new DittoError("store/failed-to-create-attachment", `Invalid attachment metadata: metadata values must be strings but key '${t}' has a value of type ${typeof e[t]}.`);
}
function augmentJSONValue(e, t, n) {
  if (e && "object" == typeof e) {
    if (Array.isArray(e)) return e.map((e2, r) => augmentJSONValue(e2, t, `${n}[${r}]`));
    if (e[DittoCRDTTypeKey] === DittoCRDTType.counter) return Counter["@ditto.create"](t, n, e._value);
    if (e[DittoCRDTTypeKey] === DittoCRDTType.register) return Register["@ditto.create"](t, n, e._value);
    if (e[DittoCRDTTypeKey] === DittoCRDTType.attachment) return new AttachmentToken(e);
    for (const [r, i] of Object.entries(e)) e[r] = augmentJSONValue(i, t, `${n}['${r}']`);
    return e;
  }
  return e;
}
function desugarJSObject(e) {
  if (e && "object" == typeof e) {
    if (Array.isArray(e)) return e.map((e2, t) => desugarJSObject(e2));
    if (e instanceof DocumentID) return e.value;
    if (e instanceof Counter) {
      const t = {};
      return t[DittoCRDTTypeKey] = DittoCRDTType.counter, t._value = e.value, t;
    }
    if (e instanceof Register) {
      const t = {};
      return t[DittoCRDTTypeKey] = DittoCRDTType.register, t._value = e.value, t;
    }
    if (e instanceof Attachment) {
      const t = { _id: e.token.idBytes, _len: e.token.len, _meta: e.token.metadata };
      return t[DittoCRDTTypeKey] = DittoCRDTType.attachment, t;
    }
    {
      const t = {};
      for (const [n, r] of Object.entries(e)) t[n] = desugarJSObject(r);
      return t;
    }
  }
  return checkForUnsupportedValues(e), e;
}
function checkForUnsupportedValues(e) {
  if (Number.isNaN(e) || e === 1 / 0 || e === -1 / 0) throw new Error("Non-finite float values are not supported");
}
var UpdateResult = class _UpdateResult {
  static set(e, t, n) {
    return new _UpdateResult("set", e, t, n, void 0);
  }
  static incremented(e, t, n) {
    return new _UpdateResult("incremented", e, t, void 0, n);
  }
  static removed(e, t) {
    return new _UpdateResult("removed", e, t, void 0, void 0);
  }
  constructor(e, t, n, r, i) {
    this.type = e, this.docID = t, this.path = n, void 0 !== r && (this.value = r), void 0 !== i && (this.amount = i);
  }
};
function defaultAuthURL(e) {
  return `https://${e}.cloud.ditto.live`;
}
function validateNumber(e, t = {}) {
  var n;
  const r = null !== (n = t.errorMessagePrefix) && void 0 !== n ? n : "Number validation failed:", i = !!t.integer, o = t.min, a = t.max, s = t.minX, c = t.maxX;
  if ("number" != typeof e) throw new Error(`${r} '${e}' is not a number.`);
  if (i && Math.floor(e) !== e) throw new Error(`${r} '${e}' is not an integer.`);
  if (void 0 !== o && e < o) throw new Error(`${r} '${e}' must be >= ${o}.`);
  if (void 0 !== a && e > a) throw new Error(`${r} '${e}' must be <= ${a}.`);
  if (void 0 !== s && e <= s) throw new Error(`${r} '${e}' must be > ${s}.`);
  if (void 0 !== c && e >= c) throw new Error(`${r} '${e}' must be < ${c}.`);
  return e;
}
function validateQuery(e, t = {}) {
  var n;
  const r = null !== (n = t.errorMessagePrefix) && void 0 !== n ? n : "Query validation failed,";
  if ("string" != typeof e) throw new Error(`${r} query is not a string: ${e}`);
  if ("" === e) throw new Error(`${r} query is an empty string.`);
  const i = e.trim();
  if ("" === i) throw new Error(`${r} query contains only whitespace characters.`);
  return i;
}
function customInspectRepresentation(e, t) {
  return void 0 === t ? `${e.constructor.name} ${JSON.stringify({ value: e.value }, null, 2)}` : `${e.constructor.name} ${t({ value: e.value })}`;
}
function sleep(e) {
  return new Promise((t, n) => {
    setTimeout(t, e);
  });
}
async function step(e) {
  return await sleep(0), e();
}
var performAsyncToWorkaroundNonAsyncFFIAPI = step;
var regularKeyPattern = /\.([A-Za-z_]\w*)/.source;
var subscriptIndexPattern = /\[(\d+)\]/.source;
var subscriptSingleQuoteKeyPattern = /\[\'(.+?)\'\]/.source;
var subscriptDoubleQuoteKeyPattern = /\[\"(.+?)\"\]/.source;
var validKeyPathPattern = `((${regularKeyPattern})|(${subscriptIndexPattern})|(${subscriptSingleQuoteKeyPattern})|(${subscriptDoubleQuoteKeyPattern}))*`;
var regularKeyRegExp = new RegExp(`^${regularKeyPattern}`);
var subscriptIndexRegExp = new RegExp(`^${subscriptIndexPattern}`);
var subscriptSingleQuoteKeyRegExp = new RegExp(`^${subscriptSingleQuoteKeyPattern}`);
var subscriptDoubleQuoteKeyRegExp = new RegExp(`^${subscriptDoubleQuoteKeyPattern}`);
var validKeyPathRegExp = new RegExp(`^${validKeyPathPattern}$`);
var KeyPath = class {
  static withLeadingDot(e) {
    if ("number" == typeof e) return e;
    if ("string" != typeof e) throw new Error(`Key-path must be a string or a number but is ${typeof e}: ${e}`);
    return "string" == typeof e && !!e.match(/^[A-Za-z_]/) ? `.${e}` : e;
  }
  static withoutLeadingDot(e) {
    if ("number" == typeof e) return e;
    if ("string" != typeof e) throw new Error(`Key-path must be a string or a number but is ${typeof e}: ${e}`);
    return "string" == typeof e && !!e.match(/^\./) ? e.slice(1) : e;
  }
  static validate(e, t = {}) {
    var n;
    const r = null !== (n = t.isInitial) && void 0 !== n && n;
    if ("number" == typeof e) return Math.floor(Math.abs(e));
    if ("string" != typeof e) throw new Error(`Key-path must be a string or a number but is ${typeof e}: ${e}`);
    const i = this.withLeadingDot(e);
    if (!validKeyPathRegExp.test(i)) throw new Error(`Key-path is not valid: ${e}`);
    return r ? e : i;
  }
  static evaluate(e, t, n = {}) {
    var r;
    const i = null !== (r = n.stopAtLastContainer) && void 0 !== r && r, o = { keyPath: e, object: t, options: { ...n }, coveredPath: null, nextPathComponent: null, remainingPath: e, value: t };
    return function recurse(e2, t2) {
      if ("" === t2) return o.value = e2, o;
      const { nextPathComponentRaw: n2, nextPathComponent: r2, remainingPath: a } = function advance(e3) {
        if ("number" == typeof e3) return { nextPathComponentRaw: e3, nextPathComponent: e3, remainingPath: "" };
        if ("string" != typeof e3) throw new Error(`Can't return value at given keyPath, expected keyPath to be a string or a number but got ${typeof e3}: ${e3}`);
        const t3 = e3.match(regularKeyRegExp);
        if (null !== t3) {
          const n4 = t3[0], r4 = t3[1];
          return { nextPathComponentRaw: n4, nextPathComponent: r4, remainingPath: e3.slice(r4.length + 1) };
        }
        const n3 = e3.match(subscriptIndexRegExp);
        if (null !== n3) {
          const t4 = n3[0], r4 = n3[1];
          return { nextPathComponentRaw: t4, nextPathComponent: parseInt(r4), remainingPath: e3.slice(r4.length + 2) };
        }
        const r3 = e3.match(subscriptSingleQuoteKeyRegExp);
        if (null !== r3) {
          const t4 = r3[0], n4 = r3[1];
          return { nextPathComponentRaw: t4, nextPathComponent: n4, remainingPath: e3.slice(n4.length + 4) };
        }
        const i2 = e3.match(subscriptDoubleQuoteKeyRegExp);
        if (null !== i2) {
          const t4 = i2[0], n4 = i2[1];
          return { nextPathComponentRaw: t4, nextPathComponent: n4, remainingPath: e3.slice(n4.length + 4) };
        }
        throw new Error(`Can't return value at keyPath because the following part of the keyPath is invalid: ${e3}`);
      }(t2);
      return o.nextPathComponent = r2, o.remainingPath = a, null === o.coveredPath || "number" == typeof n2 ? o.coveredPath = n2 : o.coveredPath += n2, "" === a && i ? (o.value = e2, o) : recurse(e2[r2], a);
    }(t, this.withLeadingDot(e));
  }
  constructor() {
  }
};
var DocumentPath = class _DocumentPath {
  at(e) {
    if ("string" == typeof e) {
      const t = e, n = KeyPath.validate(t), r = KeyPath.withoutLeadingDot(`${this.path}${n}`);
      return new _DocumentPath(this.document, r, false);
    }
    if ("number" == typeof e) {
      const t = validateNumber(e, { integer: true, min: 0, errorMessagePrefix: "DocumentPath.at() validation failed index:" });
      return new _DocumentPath(this.document, `${this.path}[${t.toString()}]`, false);
    }
    throw new Error(`Can't return document path at key-path or index, string or number expected but got ${typeof e}: ${e}`);
  }
  get value() {
    return this.underlyingValueForPathType("Any");
  }
  get counter() {
    const e = this.underlyingValueForPathType("Counter");
    return void 0 !== e ? Counter["@ditto.create"](null, this.path, e) : null;
  }
  get register() {
    const e = this.underlyingValueForPathType("Register");
    return void 0 !== e ? Register["@ditto.create"](null, this.path, e) : null;
  }
  get attachmentToken() {
    const e = this.underlyingValueForPathType("Attachment");
    return void 0 !== e ? new AttachmentToken(e) : null;
  }
  constructor(e, t, n) {
    this.document = e, this.path = n ? KeyPath.validate(t, { isInitial: true }) : t;
  }
  underlyingValueForPathType(e) {
    const t = this.path, n = this.document, r = documentGetCBORWithPathType(Bridge.document.handleFor(n).deref(), t, e);
    return null !== r.cbor ? CBOR.decode(r.cbor) : void 0;
  }
};
var MutableDocumentPath = class _MutableDocumentPath {
  at(e) {
    if ("string" == typeof e) {
      const t = e, n = KeyPath.validate(t), r = KeyPath.withoutLeadingDot(`${this.path}${n}`);
      return new _MutableDocumentPath(this.mutableDocument, r, false);
    }
    if ("number" == typeof e) {
      const t = validateNumber(e, { integer: true, min: 0, errorMessagePrefix: "MutableDocumentPath.at() validation failed index:" });
      return new _MutableDocumentPath(this.mutableDocument, `${this.path}[${t.toString()}]`, false);
    }
    throw new Error(`Can't return mutable document path at key-path or index, string or number expected but got ${typeof e}: ${e}`);
  }
  get value() {
    return this.underlyingValueForPathType("Any");
  }
  get counter() {
    const e = this.underlyingValueForPathType("Counter");
    return void 0 !== e ? Counter["@ditto.create"](this.mutableDocument, this.path, e) : null;
  }
  get register() {
    const e = this.underlyingValueForPathType("Register");
    return void 0 !== e ? Register["@ditto.create"](this.mutableDocument, this.path, e) : null;
  }
  get attachmentToken() {
    const e = this.underlyingValueForPathType("Attachment");
    return void 0 !== e ? new AttachmentToken(e) : null;
  }
  set(e, t) {
    return this["@ditto.set"](e, t);
  }
  remove() {
    return this["@ditto.remove"]();
  }
  constructor(e, t, n) {
    this.mutableDocument = e, this.path = n ? KeyPath.validate(t, { isInitial: true }) : t;
  }
  underlyingValueForPathType(e) {
    const t = this.path, n = this.mutableDocument, r = documentGetCBORWithPathType(Bridge.mutableDocument.handleFor(n).deref(), t, e);
    return null !== r.cbor ? CBOR.decode(r.cbor) : void 0;
  }
  "@ditto.increment"(e) {
    documentIncrementCounter(Bridge.mutableDocument.handleFor(this.mutableDocument).deref(), this.path, e);
    const t = UpdateResult.incremented(this.mutableDocument.id, this.path, e);
    this.recordUpdateResult(t);
  }
  "@ditto.set"(e, t) {
    const n = Bridge.mutableDocument.handleFor(this.mutableDocument), r = desugarJSObject(e), i = CBOR.encode(r);
    t ? documentSetCBORWithTimestamp(n.deref(), this.path, i, 0) : documentSetCBOR(n.deref(), this.path, i);
    const o = augmentJSONValue(CBOR.decode(i), this.mutableDocument, this.path), a = UpdateResult.set(this.mutableDocument.id, this.path, o);
    this.recordUpdateResult(a);
  }
  "@ditto.remove"() {
    documentRemove(Bridge.mutableDocument.handleFor(this.mutableDocument).deref(), this.path), this.updateInMemory((e2, t) => {
      Array.isArray(e2) && "number" == typeof t ? e2.splice(t, 1) : delete e2[t];
    });
    const e = UpdateResult.removed(this.mutableDocument.id, this.path);
    this.recordUpdateResult(e);
  }
  updateInMemory(e) {
    const t = this.mutableDocument.value, n = KeyPath.evaluate(this.path, t, { stopAtLastContainer: true });
    e(n.value, n.nextPathComponent);
  }
  recordUpdateResult(e) {
    const t = this.mutableDocument["@ditto.updateResults"].slice();
    t.push(e), Object.freeze(t), this.mutableDocument["@ditto.updateResults"] = t;
  }
};
var CUSTOM_INSPECT_SYMBOL$1 = Symbol.for("nodejs.util.inspect.custom");
var Document = class {
  static hash(e) {
    return documentsHash(documentsFrom(e).map((e2) => Bridge.document.handleFor(e2)).map((e2) => e2.deref()));
  }
  static hashMnemonic(e) {
    const t = documentsFrom(e);
    return documentsHashMnemonic(Bridge.document.handlesFor(t).deref());
  }
  get id() {
    let e = this["@ditto.id"];
    if (void 0 === e) {
      const t = documentID(Bridge.document.handleFor(this).deref());
      e = new DocumentID(t, true), this["@ditto.id"] = e;
    }
    return e;
  }
  get path() {
    return new DocumentPath(this, "", false);
  }
  get value() {
    let e = this["@ditto.value"];
    return void 0 === e && (e = this.path.value, this["@ditto.value"] = e), e;
  }
  at(e) {
    return this.path.at(e);
  }
  constructor() {
  }
  static idCBOR(e) {
    return documentID(Bridge.document.handleFor(e).deref());
  }
  static canonicalizedIDCBOR(e) {
    return validateDocumentIDCBOR(e);
  }
  static isIDCBORCanonical(e) {
    return e === this.canonicalizedIDCBOR(e);
  }
  toString() {
    return `${this.constructor.name}(${this.id})`;
  }
  [CUSTOM_INSPECT_SYMBOL$1](e, t, n) {
    return customInspectRepresentation(this, n);
  }
};
var MutableDocument = class {
  get id() {
    let e = this["@ditto.id"];
    if (void 0 === e) {
      const t = documentID(Bridge.mutableDocument.handleFor(this).deref());
      e = new DocumentID(t, true), this["@ditto.id"] = e;
    }
    return e;
  }
  get path() {
    return new MutableDocumentPath(this, "", false);
  }
  get value() {
    return this.path.value;
  }
  at(e) {
    return this.path.at(e);
  }
  constructor() {
    this["@ditto.updateResults"] = [];
  }
  static idCBOR(e) {
    return documentID(Bridge.mutableDocument.handleFor(e).deref());
  }
  toString() {
    return `${this.constructor.name}(${this.id})`;
  }
  [CUSTOM_INSPECT_SYMBOL$1](e, t, n) {
    return customInspectRepresentation(this, n);
  }
};
function documentsFrom(e) {
  if (!e) return [];
  if (e instanceof Document) return [e];
  if (e instanceof Array) return e;
  throw new Error(`Expected null, a single document, or an array of documents but got value of type ${typeof e}: ${e}`);
}
MutableDocument.canonicalizedIDCBOR = Document.canonicalizedIDCBOR, MutableDocument.isIDCBORCanonical = Document.isIDCBORCanonical;
var UpdateResultsMap = class {
  get(e) {
    const t = (e instanceof DocumentID ? e : new DocumentID(e)).toString();
    return this.updateResultsByDocumentIDString[t];
  }
  keys() {
    return this.documentIDs.slice();
  }
  constructor(e, t) {
    const n = e.map((e2) => e2.toString()).sort().join(", ");
    if (n !== Object.keys(t).sort().join(", ")) throw new Error("Internal inconsistency, can't construct update results map, documentIDs must all be keys in update results (by document ID string)");
    this.documentIDs = e.slice(), this.updateResultsByDocumentIDString = { ...t };
  }
};
var BasePendingCursorOperation = class {
  sort(e, t = "ascending") {
    return this.orderBys.push({ query: e, direction: "ascending" === t ? "Ascending" : "Descending" }), this;
  }
  offset(e) {
    if (e < 0) throw new Error(`Can't offset by '${e}', offset must be >= 0`);
    if (!Number.isFinite(e)) throw new Error(`Can't offset by '${e}', offset must be a finite number`);
    if (Number.isNaN(e)) throw new Error(`Can't offset by '${e}', offset must be a valid number`);
    if (e !== Math.round(e)) throw new Error(`Can't offset by '${e}', offset must be an integer number`);
    return this.currentOffset = e, this;
  }
  limit(e) {
    if (e < -1) throw new Error(`Can't limit to '${e}', limit must be >= -1 (where -1 means unlimited)`);
    if (!Number.isFinite(e)) throw new Error(`Can't limit to '${e}', limit must be a finite number`);
    if (Number.isNaN(e)) throw new Error(`Can't limit to '${e}', limit must be a valid number`);
    if (e !== Math.round(e)) throw new Error(`Can't limit to '${e}', limit must be an integer number`);
    return this.currentLimit = e, this;
  }
  async exec() {
    return this.collection.store.ditto.deferCloseAsync(async (e) => {
      const t = this.query;
      return (await performAsyncToWorkaroundNonAsyncFFIAPI(async () => await collectionExecQueryStr(e.deref(), this.collection.name, null, t, this.queryArgsCBOR, this.orderBys, this.currentLimit, this.currentOffset))).map((e2) => Bridge.document.bridge(e2));
    });
  }
  async updateWithClosure(e, t, n) {
    return this.collection.store.ditto.deferCloseAsync(async (r) => await performAsyncToWorkaroundNonAsyncFFIAPI(async () => {
      const i = this.query, o = null != n ? n : await writeTransaction(r.deref()), a = await collectionExecQueryStr(r.deref(), this.collection.name, o, i, this.queryArgsCBOR, this.orderBys, this.currentLimit, this.currentOffset), s = a.map((e2) => Bridge.mutableDocument.bridge(e2, () => new MutableDocument()));
      e(s) instanceof Promise && Logger.warning(`Expected ${t} to be called with a synchronous closure but it was called with an async closure.`);
      const c = [], l = {};
      for (const e2 of s) {
        const t2 = e2.id, n2 = t2.toString(), r2 = e2["@ditto.updateResults"];
        if (l[n2]) throw new Error(`Internal inconsistency, update results for document ID as string already exist: ${n2}`);
        c.push(t2), l[n2] = r2, Bridge.mutableDocument.unregister(e2);
      }
      return await collectionUpdateMultiple(r.deref(), this.collection.name, o, a), n || await writeTransactionCommit(r.deref(), o), new UpdateResultsMap(c, l);
    }));
  }
  constructor(e, t, n) {
    if (this.currentLimit = -1, this.currentOffset = 0, this.orderBys = [], this.query = validateQuery(e), this.queryArgs = t ? Object.freeze({ ...t }) : null, this.collection = n, null == t) this.queryArgsCBOR = null;
    else {
      const e2 = desugarJSObject(t);
      this.queryArgsCBOR = CBOR.encode(e2);
    }
  }
  then(e, t) {
    return this.exec().then(e, t);
  }
};
var BasePendingIDSpecificOperation = class {
  async exec() {
    return this.collection.store.ditto.deferCloseAsync(async (e) => await performAsyncToWorkaroundNonAsyncFFIAPI(async () => {
      const t = await readTransaction(e.deref()), n = await collectionGet(e.deref(), this.collection.name, this.documentIDCBOR, t);
      let r;
      return n && (r = Bridge.document.bridge(n)), readTransactionFree(t), r;
    }));
  }
  constructor(e, t) {
    this.documentID = e, this.collection = t, this.documentIDCBOR = e.toCBOR();
  }
  then(e, t) {
    return this.exec().then(e, t);
  }
  get query() {
    return `_id == ${this.documentID.toQueryCompatibleString()}`;
  }
  async updateWithClosure(e, t, n, r, i) {
    return this.collection.store.ditto.deferCloseAsync(async (o) => {
      var a;
      let s = null;
      if (null == i) {
        const e2 = await readTransaction(o.deref());
        try {
          s = await collectionGet(o.deref(), this.collection.name, this.documentIDCBOR, e2);
        } finally {
          readTransactionFree(e2);
        }
      } else s = await collectionGetWithWriteTransaction(o.deref(), this.collection.name, this.documentIDCBOR, i.writeTransactionPointer);
      const c = `Expected ${r} to be called with a synchronous closure but it was called with an async closure`;
      if (!s) {
        if (n) throw new Error(`Can't update, document with ID '${this.documentID.toString()}' not found in collection named '${this.collection.name}'`);
        if (e() instanceof Promise) {
          if (t) throw new TypeError(c);
          Logger.warning(c);
        }
        return [];
      }
      const l = Bridge.mutableDocument.bridge(s, () => new MutableDocument());
      if (e(l) instanceof Promise) {
        if (t) throw new TypeError(c);
        Logger.warning(c);
      }
      const u = null !== (a = null == i ? void 0 : i.writeTransactionPointer) && void 0 !== a ? a : await writeTransaction(o.deref());
      return Bridge.mutableDocument.unregister(l), await collectionUpdate(o.deref(), this.collection.name, u, s), i || await writeTransactionCommit(o.deref(), u), l["@ditto.updateResults"].slice();
    });
  }
};
var ConnectionRequest = class {
  get peerKeyString() {
    return connectionRequestPeerKeyString(this.deref());
  }
  get peerMetadata() {
    return JSON.parse(this.peerMetadataJSONString);
  }
  get peerMetadataJSONString() {
    return connectionRequestPeerMetadataJSON(this.deref());
  }
  get identityServiceMetadata() {
    return JSON.parse(this.identityServiceMetadataJSONString);
  }
  get identityServiceMetadataJSONString() {
    return connectionRequestIdentityServiceMetadataJSON(this.deref());
  }
  get connectionType() {
    return connectionRequestConnectionType(this.deref());
  }
  toString() {
    return `ConnectionRequest(${this.peerKeyString} via ${this.connectionType})`;
  }
  [Symbol.for("nodejs.util.inspect.custom")](e, t, n) {
    return this.toString();
  }
  deref() {
    return Bridge.connectionRequest.handleFor(this).deref();
  }
};
var ObserverManager = class {
  constructor(e, t = {}) {
    var n, r, i, o;
    const a = null !== (n = t.keepAlive) && void 0 !== n ? n : null, s = null !== (r = t.register) && void 0 !== r ? r : null, c = null !== (i = t.unregister) && void 0 !== i ? i : null, l = null !== (o = t.process) && void 0 !== o ? o : null;
    this.id = e, this.keepAlive = a, this.isClosed = false, this.isRegistered = false, this.callbacksByToken = {}, null !== s && (this.register = s), null !== c && (this.unregister = c), null !== l && (this.process = l);
  }
  addObserver(e) {
    var t;
    if (this.isClosed) throw new Error(`Internal inconsistency, can't add '${this.id}' observer, observer mananger close()-ed.`);
    this.registerIfNeeded();
    const n = cryptoGenerateSecureRandomToken();
    return this.callbacksByToken[n] = e, null === (t = this.keepAlive) || void 0 === t || t.retain(`${this.id}.${n}`), n;
  }
  removeObserver(e) {
    var t;
    const n = this.callbacksByToken[e];
    if (void 0 === n) throw new Error(`Can't remove '${this.id}' observer, token '${e}' has never been registered before.`);
    null !== n && (this.callbacksByToken[e] = null, null === (t = this.keepAlive) || void 0 === t || t.release(`${this.id}.${e}`), this.unregisterIfNeeded());
  }
  hasObserver(e) {
    return void 0 !== this.callbacksByToken[e];
  }
  notify(...e) {
    if (this.isClosed) return;
    const t = this.process(...e);
    for (const e2 in this.callbacksByToken) {
      const n = this.callbacksByToken[e2];
      n && n(...t);
    }
  }
  close() {
    this.isClosed = true;
    for (const e in this.callbacksByToken) this.removeObserver(e);
  }
  register(e) {
  }
  unregister() {
  }
  process(...e) {
    return e;
  }
  hasObservers() {
    return Object.keys(this.callbacksByToken).length > 0;
  }
  registerIfNeeded() {
    if (!this.isRegistered) {
      const e = new WeakRef(this);
      this.isRegistered = true, this.register(function(...t) {
        const n = e.deref();
        n && n.notify(...t);
      });
    }
  }
  unregisterIfNeeded() {
    !this.hasObservers() && this.isRegistered && (this.isRegistered = false, this.unregister());
  }
};
var AuthenticationStatus = { fromFFI(e) {
  const t = authenticationStatusIsAuthenticated(e), n = authenticationStatusUserID(e);
  return authenticationStatusFree(e), { isAuthenticated: t, userID: n };
} };
var Authenticator = class {
  get status() {
    return this._status;
  }
  async login(e, t) {
    throw new Error("Authenticator.login() is abstract and must be implemented by subclasses.");
  }
  loginWithToken(e, t) {
    throw new Error("Authenticator.loginWithToken() is abstract and must be implemented by subclasses.");
  }
  loginWithUsernameAndPassword(e, t, n) {
    throw new Error("Authenticator.loginWithUsernameAndPassword() is abstract and must be implemented by subclasses.");
  }
  logout(e) {
    throw new Error("Authenticator.logout() is abstract and must be implemented by subclasses.");
  }
  observeStatus(e) {
    const t = this.observerManager.addObserver(e);
    return new Observer(this.observerManager, t, { stopsWhenFinalized: true });
  }
  constructor(e) {
    this.keepAlive = e, this._status = { isAuthenticated: false, userID: null }, this.loginSupported = false, this.observerManager = new ObserverManager("AuthenticationStatusObservation", { keepAlive: e });
  }
  "@ditto.authenticationExpiring"(e) {
    throw new Error("Authenticator['@ditto.authenticationExpiring']() is abstract and must be implemented by subclasses.");
  }
  close() {
    this.observerManager.close();
  }
};
var OnlineAuthenticator = class extends Authenticator {
  async login(e, t) {
    const n = this.ditto.deref();
    if (!n || n.isClosed) throw new DittoError("authentication/failed-to-authenticate", "Ditto instance is closed");
    return n.deferCloseAsync(async (n2) => {
      const { clientInfo: r, error: i } = await dittoAuthClientLoginWithTokenAndFeedback(n2.deref(), e, t);
      return { clientInfo: r, error: null != i ? DittoError.fromFFIError(i, "authentication/failed-to-authenticate") : null };
    });
  }
  async loginWithToken(e, t) {
    const n = this.ditto.deref();
    if (n && !n.isClosed) return n.deferCloseAsync(async (n2) => {
      await dittoAuthClientLoginWithToken(n2.deref(), e, t);
    });
  }
  async loginWithUsernameAndPassword(e, t, n) {
    const r = this.ditto.deref();
    if (r && !r.isClosed) return r.deferCloseAsync(async (r2) => {
      await dittoAuthClientLoginWithUsernameAndPassword(r2.deref(), e, t, n);
    });
  }
  async logout(e) {
    const t = this.ditto.deref();
    if (t && !t.isClosed) return t.deferCloseAsync(async (n) => {
      await dittoAuthClientLogout(n.deref()), t.stopSync(), null == e || e(t);
    });
  }
  constructor(e, t, n) {
    super(e), this.loginSupported = true, this._status = { isAuthenticated: false, userID: null }, this.ditto = new WeakRef(t), this.authenticationHandler = n;
    const r = new WeakRef(this);
    t.deferClose((e2) => {
      dittoSetAuthenticationStatusHandler(e2.deref(), function(e3) {
        const t2 = r.deref();
        if (null == t2) return void Logger.info("Authenticator is null, ignoring authentication status change");
        const n2 = AuthenticationStatus.fromFFI(e3);
        t2.authenticationStatusUpdated(n2);
      });
    }), this.updateAndNotify(false);
  }
  "@ditto.authenticationExpiring"(e) {
    const t = this.authenticationHandler;
    e > 0 ? t.authenticationExpiringSoon(this, e) : t.authenticationRequired(this);
  }
  authenticationStatusUpdated(e) {
    var t;
    const n = this.status;
    this._status = e;
    !!n.isAuthenticated == !!e.isAuthenticated && n.userID === e.userID || (null === (t = this.authenticationHandler.authenticationStatusDidChange) || void 0 === t || t.call(this.authenticationHandler, this), this.observerManager.notify(e));
  }
  updateAndNotify(e) {
    const t = this.ditto.deref();
    if (!t) return void Logger.debug("Unable to update auth status and notify, related Ditto object does not exist anymore.");
    const n = Bridge.ditto.handleFor(t).derefOrNull();
    if (!n) return void Logger.debug("Unable to update auth status and notify, related Ditto object does not exist anymore.");
    const r = { isAuthenticated: dittoAuthClientIsWebValid(n), userID: dittoAuthClientUserID(n) };
    e ? this.authenticationStatusUpdated(r) : this._status = r;
  }
};
var NotAvailableAuthenticator = class extends Authenticator {
  async login(e, t) {
    throw new Error("Can't login, authentication is not supported for the identity in use, please use an onlineWithAuthentication identity.");
  }
  async loginWithToken(e, t) {
    throw new Error("Can't login, authentication is not supported for the identity in use, please use an onlineWithAuthentication identity.");
  }
  async loginWithUsernameAndPassword(e, t, n) {
    throw new Error("Can't login, authentication is not supported for the identity in use, please use an onlineWithAuthentication identity.");
  }
  logout(e) {
    throw new Error("Can't logout, authentication is not supported for the identity in use, please use an onlineWithAuthentication identity.");
  }
  "@ditto.authenticationExpiring"(e) {
    throw new Error(`Internal inconsistency, authentication is not available, yet the @ditto.authenticationExpiring() was called on authenticator: ${this}`);
  }
};
var IdentityTypesRequiringOfflineLicenseToken = ["manual", "sharedKey", "offlinePlayground"];
function transportConfigFromDeserializable(e) {
  const t = e.peer_to_peer, n = t.bluetooth_le.enabled, r = t.awdl.enabled, i = t.lan, o = i.enabled, a = i.mdns_enabled, s = i.multicast_enabled, c = e.connect, l = c.tcp_servers, u = c.websocket_urls, d = c.retry_interval, f = e.listen, h = f.tcp, _ = h.enabled, g = h.interface_ip, m = h.port, b = f.http, w = b.enabled, y = b.interface_ip, p = b.port, v = b.static_content_path, E = b.websocket_sync, T = b.tls_key_path, I = b.tls_certificate_path, k = e.global, F = k.sync_group, C = k.routing_hint, S = new TransportConfig();
  return S.peerToPeer.bluetoothLE.isEnabled = n, S.peerToPeer.awdl.isEnabled = r, S.peerToPeer.lan.isEnabled = o, S.peerToPeer.lan.isMdnsEnabled = a, S.peerToPeer.lan.isMulticastEnabled = s, S.connect.tcpServers = l, S.connect.websocketURLs = u, S.connect.retryInterval = d, S.listen.tcp.isEnabled = _, S.listen.tcp.interfaceIP = g, S.listen.tcp.port = m, S.listen.http.isEnabled = w, S.listen.http.interfaceIP = y, S.listen.http.port = p, S.listen.http.staticContentPath = v, S.listen.http.websocketSync = E, S.listen.http.tlsKeyPath = T, S.listen.http.tlsCertificatePath = I, S.global.syncGroup = F, S.global.routingHint = C, S;
}
function transportConfigToSerializable(e) {
  const t = e.peerToPeer, n = e.connect, r = e.listen, i = e.global, o = { peer_to_peer: { bluetooth_le: { enabled: t.bluetoothLE.isEnabled }, awdl: { enabled: t.awdl.isEnabled }, lan: { enabled: t.lan.isEnabled, mdns_enabled: t.lan.isMdnsEnabled, multicast_enabled: t.lan.isMulticastEnabled } }, connect: { tcp_servers: n.tcpServers, websocket_urls: n.websocketURLs, retry_interval: n.retryInterval }, listen: { tcp: { enabled: r.tcp.isEnabled, interface_ip: r.tcp.interfaceIP, port: r.tcp.port }, http: { enabled: r.http.isEnabled, interface_ip: r.http.interfaceIP, port: r.http.port, websocket_sync: r.http.websocketSync } }, global: { sync_group: i.syncGroup, routing_hint: i.routingHint } };
  return r.http.staticContentPath && (o.listen.http.static_content_path = r.http.staticContentPath), r.http.tlsKeyPath && (o.listen.http.tls_key_path = r.http.tlsKeyPath), r.http.tlsCertificatePath && (o.listen.http.tls_certificate_path = r.http.tlsCertificatePath), o;
}
var TransportConfig = class _TransportConfig {
  constructor() {
    this._isFrozen = false, this.peerToPeer = { bluetoothLE: { isEnabled: false }, awdl: { isEnabled: false }, lan: { isEnabled: false, isMdnsEnabled: true, isMulticastEnabled: true } }, this.connect = { tcpServers: [], websocketURLs: [], retryInterval: 5e3 }, this.listen = { tcp: { isEnabled: false, interfaceIP: "[::]", port: 4040 }, http: { isEnabled: false, interfaceIP: "[::]", port: 80, websocketSync: true } }, this.global = { syncGroup: 0, routingHint: 0 };
  }
  setAllPeerToPeerEnabled(e) {
    this.peerToPeer.bluetoothLE.isEnabled = e, this.peerToPeer.lan.isEnabled = e, this.peerToPeer.awdl.isEnabled = e;
  }
  get isFrozen() {
    return this._isFrozen;
  }
  freeze() {
    return this.isFrozen || (this._isFrozen = true, Object.freeze(this.peerToPeer.bluetoothLE), Object.freeze(this.peerToPeer.awdl), Object.freeze(this.peerToPeer.lan), Object.freeze(this.peerToPeer), Object.freeze(this.connect.tcpServers), Object.freeze(this.connect.websocketURLs), Object.freeze(this.connect), Object.freeze(this.listen.tcp), Object.freeze(this.listen.http), Object.freeze(this.listen), Object.freeze(this.global)), this;
  }
  copy() {
    const e = new _TransportConfig();
    return e.peerToPeer.bluetoothLE.isEnabled = this.peerToPeer.bluetoothLE.isEnabled, e.peerToPeer.awdl.isEnabled = this.peerToPeer.awdl.isEnabled, e.peerToPeer.lan.isEnabled = this.peerToPeer.lan.isEnabled, e.peerToPeer.lan.isMdnsEnabled = this.peerToPeer.lan.isMdnsEnabled, e.peerToPeer.lan.isMulticastEnabled = this.peerToPeer.lan.isMulticastEnabled, e.connect.tcpServers = this.connect.tcpServers.slice(), e.connect.websocketURLs = this.connect.websocketURLs.slice(), e.connect.retryInterval = this.connect.retryInterval, e.listen.tcp = { ...this.listen.tcp }, e.listen.http = { ...this.listen.http }, e.global.syncGroup = this.global.syncGroup, e.global.routingHint = this.global.routingHint, e;
  }
  static areListenTCPsEqual(e, t) {
    return e.isEnabled === t.isEnabled && e.interfaceIP === t.interfaceIP && e.port === t.port;
  }
  static areListenHTTPsEqual(e, t) {
    return e.isEnabled === t.isEnabled && e.interfaceIP === t.interfaceIP && e.port === t.port && e.staticContentPath === t.staticContentPath && e.websocketSync === t.websocketSync && e.tlsKeyPath === t.tlsKeyPath && e.tlsCertificatePath === t.tlsCertificatePath;
  }
};
var AttachmentFetcher = class {
  stop() {
    if (null == this.manager) {
      this.isStopped || (this.rejectPendingFetch(), this.rejectPendingFetch = null), this.ditto.store.removeAttachmentFetcher(this);
      const e = Bridge.ditto.handleFor(this.ditto);
      this.ditto.deferCloseAsync(async () => {
        const t = await this.cancelTokenPromise;
        t && dittoCancelResolveAttachment(e.deref(), this.token.idBytes, t);
      });
    } else step(async () => {
      await this.manager.stopAttachmentFetcher(this), null != this.rejectPendingFetch && (this.rejectPendingFetch(), this.rejectPendingFetch = null);
    });
  }
  then(e, t) {
    return this.attachment.then(e, t);
  }
  constructor(e, t, n, r) {
    this.cancelTokenPromise = null, this.rejectPendingFetch = null, this.ditto = e, this.token = t, this.manager = n, this.id = cryptoGenerateSecureRandomToken();
    const i = r || function() {
    }, o = Bridge.ditto.handleFor(e);
    this.attachment = new Promise((e2, n2) => {
      const onComplete = (t2) => {
        const n3 = new Attachment(this.ditto, this.token);
        Bridge.attachment.bridge(t2, () => n3), i({ type: "Completed", attachment: n3 }), this.rejectPendingFetch = null, e2(n3);
      }, onProgress = (e3, t2) => {
        i({ type: "Progress", totalBytes: t2, downloadedBytes: e3 });
      }, onDelete = () => {
        i({ type: "Deleted" }), null != this.manager ? (this.rejectPendingFetch = null, e2(null)) : (this.rejectPendingFetch = null, n2(new DittoError("store/attachment-not-found", "The attachment was deleted while being fetched.")));
      }, onError = () => {
      };
      this.rejectPendingFetch = () => {
        const e3 = null != this.manager ? new Error("Attachment fetch was canceled") : new DittoError("store/failed-to-fetch-attachment", "Attachment fetch was canceled");
        n2(e3);
      };
      const r2 = new WeakRef(this);
      this.cancelTokenPromise = (async () => {
        try {
          return await mapFFIErrorsAsync(async () => dittoResolveAttachment(o.deref(), t.idBytes, { onComplete, onProgress, onDelete }, onError), { 1: ["store/failed-to-fetch-attachment", "Failed to fetch the attachment."], 2: ["store/attachment-token-invalid", "The attachment token was invalid."], 3: ["store/attachment-not-found", "The attachment was not found."] });
        } catch (t2) {
          let o2 = false;
          t2 instanceof DittoError && "store/attachment-not-found" === t2.code && (o2 = true, i({ type: "Deleted" })), Logger.error(t2.message);
          const a = r2.deref();
          return null == a || (null != a.manager && t2 instanceof DittoError && (t2 = new Error(t2.message)), a.rejectPendingFetch = null, null != a.manager && o2 ? e2(null) : n2(t2)), null;
        }
      })();
    }), null == n && this.attachment.then(() => {
      this.rejectPendingFetch = null, this.ditto.store.removeAttachmentFetcher(this);
    }).catch(() => {
      this.rejectPendingFetch = null, this.ditto.store.removeAttachmentFetcher(this);
    });
  }
  get isStopped() {
    return null == this.rejectPendingFetch;
  }
};
var Subscription = class {
  get isCancelled() {
    return this._isCancelled;
  }
  get collectionName() {
    return this.collection.name;
  }
  cancel() {
    this.isCancelled || (this._isCancelled = true, this.manager.remove(this));
  }
  constructor(e, t, n, r, i, o) {
    this._isCancelled = false, this.query = t, this.queryArgsCBOR = n, this.collection = e, this.contextInfo = { id: cryptoGenerateSecureRandomToken(), collectionName: e.name, query: t, queryArgsCBOR: n, orderBys: r, limit: i, offset: o }, this.manager = e.store.ditto.subscriptionManager, this.manager.add(this);
  }
};
var LiveQueryEventInitial = class {
  constructor() {
    this.isInitial = true;
  }
  hash(e) {
    Logger.warning("LiveQueryEventInitial.hash() is deprecated, use Document.hash() instead");
    return documentsHash(Bridge.document.handlesFor(e).deref());
  }
  hashMnemonic(e) {
    Logger.warning("LiveQueryEventInitial.hashMnemonic() is deprecated, use Document.hashMnemonic() instead");
    return documentsHashMnemonic(Bridge.document.handlesFor(e).deref());
  }
};
var LiveQueryEventUpdate = class {
  hash(e) {
    Logger.warning("LiveQueryEventUpdate.hash() is deprecated, use Document.hash() instead");
    return documentsHash(Bridge.document.handlesFor(e).deref());
  }
  hashMnemonic(e) {
    Logger.warning("LiveQueryEventUpdate.hashMnemonic() is deprecated, use Document.hashMnemonic() instead");
    return documentsHashMnemonic(Bridge.document.handlesFor(e).deref());
  }
  constructor(e) {
    this.isInitial = false, this.oldDocuments = e.oldDocuments, this.insertions = e.insertions, this.deletions = e.deletions, this.updates = e.updates, this.moves = e.moves;
  }
};
var SingleDocumentLiveQueryEvent = class {
  hash(e) {
    Logger.warning("SingleDocumentLiveQueryEvent.hash() is deprecated, use Document.hash() instead");
    return documentsHash(Bridge.document.handlesFor(null == e ? [] : [e]).deref());
  }
  hashMnemonic(e) {
    Logger.warning("SingleDocumentLiveQueryEvent.hashMnemonic() is deprecated, use Document.hashMnemonic() instead");
    return documentsHashMnemonic(Bridge.document.handlesFor(null == e ? [] : [e]).deref());
  }
  constructor(e, t) {
    this.isInitial = e, this.oldDocument = t;
  }
};
var LiveQuery = class {
  get collectionName() {
    return this.collection.name;
  }
  get isStopped() {
    return !this.liveQueryManager;
  }
  stop() {
    this.isStopped || this.liveQueryManager.stopLiveQuery(this);
  }
  get liveQueryID() {
    return this._liveQueryID;
  }
  constructor(e, t, n, r, i, o, a, s) {
    this.query = e, this.queryArgs = t ? Object.freeze({ ...t }) : null, this.queryArgsCBOR = n, this.orderBys = r, this.limit = i, this.offset = o, this.collection = a, this.handler = s, this.liveQueryManager = null;
    const c = a.name, l = new WeakRef(a.store.ditto);
    let u;
    const signalNext = async () => {
      const e2 = l.deref();
      if (e2 && !e2.isClosed) return e2.deferCloseAsync(async (e3) => {
        await liveQuerySignalAvailableNext(e3.deref(), u);
      });
    };
    if (a.store.ditto.deferClose((t2) => {
      u = liveQueryRegister(t2.deref(), c, e, n, this.orderBys, i, o, (e2) => {
        const t3 = e2.documents.map((e3) => Bridge.document.bridge(e3));
        let n2;
        n2 = e2.is_initial ? new LiveQueryEventInitial() : new LiveQueryEventUpdate({ oldDocuments: e2.old_documents.map((e3) => Bridge.document.bridge(e3)), insertions: e2.insertions, deletions: e2.deletions, updates: e2.updates, moves: e2.moves.map((e3) => ({ from: e3[0], to: e3[1] })) }), s(t3, n2, signalNext);
      });
    }), !u) throw new Error("Internal inconsistency, couldn't create a valid live query ID.");
    this._liveQueryID = u;
  }
};
var PendingCursorOperation = class extends BasePendingCursorOperation {
  sort(e, t = "ascending") {
    return super.sort(e, t);
  }
  offset(e) {
    return super.offset(e);
  }
  limit(e) {
    return super.limit(e);
  }
  async remove() {
    return this.collection.store.ditto.deferCloseAsync(async (e) => {
      const t = this.query;
      return (await performAsyncToWorkaroundNonAsyncFFIAPI(async () => {
        const n = await writeTransaction(e.deref()), r = await collectionRemoveQueryStr(e.deref(), this.collection.name, n, t, this.queryArgsCBOR, this.orderBys, this.currentLimit, this.currentOffset);
        return await writeTransactionCommit(e.deref(), n), r;
      })).map((e2) => new DocumentID(e2, true));
    });
  }
  async evict() {
    return this.collection.store.ditto.deferCloseAsync(async (e) => {
      const t = this.query;
      return (await performAsyncToWorkaroundNonAsyncFFIAPI(async () => {
        const n = await writeTransaction(e.deref()), r = await collectionEvictQueryStr(e.deref(), this.collection.name, n, t, this.queryArgsCBOR, this.orderBys, this.currentLimit, this.currentOffset);
        return await writeTransactionCommit(e.deref(), n), r;
      })).map((e2) => new DocumentID(e2, true));
    });
  }
  async update(e) {
    return this.collection.store.ditto.deferCloseAsync(async (t) => await performAsyncToWorkaroundNonAsyncFFIAPI(async () => await super.updateWithClosure(e, "cursor operation update()")));
  }
  subscribe() {
    const e = new Subscription(this.collection, this.query, this.queryArgsCBOR, this.orderBys, this.currentLimit, this.currentOffset);
    return this.collection.store.ditto.subscriptionManager.add(e), e;
  }
  observeLocal(e) {
    return this._observe(e, false);
  }
  observeLocalWithNextSignal(e) {
    return this._observe(e, true);
  }
  constructor(e, t, n) {
    super(e, t, n);
  }
  _observe(e, t) {
    const n = t ? e : async function wrappedHandler(t2, n2, r2) {
      try {
        return await e.call(this, t2, n2);
      } finally {
        r2();
      }
    }, r = new LiveQuery(this.query, this.queryArgs, this.queryArgsCBOR, this.orderBys, this.currentLimit, this.currentOffset, this.collection, n);
    return this.collection.store.ditto.liveQueryManager.startLiveQuery(r), r;
  }
};
var PendingIDSpecificOperation = class extends BasePendingIDSpecificOperation {
  async remove() {
    return this.collection.store.ditto.deferCloseAsync(async (e) => await performAsyncToWorkaroundNonAsyncFFIAPI(async () => {
      const t = await writeTransaction(e.deref()), n = await collectionRemove(e.deref(), this.collection.name, t, this.documentIDCBOR);
      return await writeTransactionCommit(e.deref(), t), n;
    }));
  }
  async evict() {
    return this.collection.store.ditto.deferCloseAsync(async (e) => await performAsyncToWorkaroundNonAsyncFFIAPI(async () => {
      const t = await writeTransaction(e.deref()), n = await collectionEvict(e.deref(), this.collection.name, t, this.documentIDCBOR);
      return await writeTransactionCommit(e.deref(), t), n;
    }));
  }
  async update(e) {
    return this.updateWithClosure(e, false, true, "ID-specific cursor operation update()");
  }
  async updateV2(e) {
    return this.updateWithClosure(e, true, false, "ID-specific cursor operation updateV2()");
  }
  subscribe() {
    const e = new Subscription(this.collection, this.query, null, [], -1, 0);
    return this.collection.store.ditto.subscriptionManager.add(e), e;
  }
  observeLocal(e) {
    return this._observe(e, false);
  }
  observeLocalWithNextSignal(e) {
    return this._observe(e, true);
  }
  constructor(e, t) {
    super(e, t);
  }
  _observe(e, t) {
    const n = new LiveQuery(this.query, null, null, [], -1, 0, this.collection, async (n2, r, i) => {
      if (n2.length > 1) throw new Error(`Internal inconsistency, single document live query returned more than one document. Query: ${this.query}}.`);
      if (false === r.isInitial && r.oldDocuments.length > 1) throw new Error(`Internal inconsistency, single document live query returned an update event with more than one old documents. Query ${this.query}.`);
      if (false === r.isInitial && r.insertions.length > 1) throw new Error(`Internal inconsistency, single document live query returned an update event with more than one insertion, which doesn't make sense for single document observations. Query ${this.query}.`);
      if (false === r.isInitial && r.deletions.length > 1) throw new Error(`Internal inconsistency, single document live query returned an update event with more than one deletion, which doesn't make sense for single document observations. Query ${this.query}.`);
      if (false === r.isInitial && r.updates.length > 1) throw new Error(`Internal inconsistency, single document live query returned an update event with more than one update, which doesn't make sense for single document observations. Query ${this.query}.`);
      if (false === r.isInitial && r.moves.length > 0) throw new Error(`Internal inconsistency, single document live query returned an update event with moves, which doesn't make sense for single document observations. Query ${this.query}.`);
      if ((true === r.isInitial ? 0 : r.insertions.length + r.deletions.length + r.updates.length) > 1) throw new Error(`Internal inconsistency, single document live query returned a combination of inserts, updates, and/or deletes, which doesn't make sense for single document observation. Query ${this.query}.`);
      const o = n2[0] || null, a = true === r.isInitial ? void 0 : r.oldDocuments[0], s = new SingleDocumentLiveQueryEvent(r.isInitial, a);
      if (t) e(o, s, i);
      else try {
        await e(o, s);
      } finally {
        i();
      }
    });
    return this.collection.store.ditto.liveQueryManager.startLiveQuery(n), n;
  }
};
var Collection = class {
  find(e, t) {
    return new PendingCursorOperation(e, null != t ? t : null, this);
  }
  findAll() {
    return this.find("true");
  }
  findByID(e) {
    const t = e instanceof DocumentID ? e : new DocumentID(e);
    return new PendingIDSpecificOperation(t, this);
  }
  async upsert(e, t = {}) {
    return this.store.ditto.deferCloseAsync(async (n) => {
      var r;
      const i = null !== (r = t.writeStrategy) && void 0 !== r ? r : "merge", o = desugarJSObject(e), a = CBOR.encode(o), s = await performAsyncToWorkaroundNonAsyncFFIAPI(async () => await collectionInsertValue(n.deref(), this.name, a, i, void 0));
      return new DocumentID(s, true);
    });
  }
  async newAttachment(e, t = {}) {
    const n = this.store.ditto;
    return n.deferCloseAsync(async (r) => {
      const { id: i, len: o, handle: a } = await (async () => {
        if ("string" == typeof e) throw new Error("Can't create attachment from file when running in the browser. Please pass the raw data (as a Uint8Array) instead.");
        if (e instanceof Uint8Array) return await dittoNewAttachmentFromBytes(r.deref(), e);
        throw new Error(`Can't create new attachment, only file path as string or raw data as Uint8Array are supported, but got: ${typeof e}, ${e}`);
      })(), s = { _id: i, _len: o, _meta: { ...t } };
      s[DittoCRDTTypeKey] = DittoCRDTType.attachment;
      const c = new AttachmentToken(s), l = new Attachment(n, c);
      return Bridge.attachment.bridge(a, () => l);
    });
  }
  fetchAttachment(e, t) {
    if (null == e || !(e instanceof AttachmentToken)) throw new Error(`Invalid attachment token: ${e}`);
    const n = this.store.ditto;
    return n.deferClose(() => n.attachmentFetcherManager.startAttachmentFetcher(e, t));
  }
  constructor(e, t) {
    this.name = e, this.store = t;
  }
  findByIDCBOR(e) {
    const t = new DocumentID(e, true, true);
    return new PendingIDSpecificOperation(t, this);
  }
};
var QueryResult = class {
  mutatedDocumentIDs() {
    return queryResultMutatedDocumentIDs(Bridge.queryResult.handleFor(this).deref()).map((e) => new DocumentID(e, true));
  }
  constructor(e) {
    if (null == e) throw new Error("Internal inconsistency, failed to initialize query result without a response pointer");
    const t = queryResultItems(e);
    this.items = t.map((e2) => Bridge.queryResultItem.bridge(e2));
  }
};
var StoreObserver = class {
  get isCancelled() {
    return this._isCancelled;
  }
  cancel() {
    this._isCancelled || (this._isCancelled = true, this.ditto.store.unregisterObserver(this));
  }
  constructor(e, t, n, r) {
    this._isCancelled = false, this.queryString = t, this.queryArguments = n ? Object.freeze({ ...n }) : void 0, this.ditto = e;
    let i, o = null;
    if (null != n) try {
      const e2 = desugarJSObject(n);
      o = CBOR.encode(e2);
    } catch (e2) {
      throw new DittoError("query/arguments-invalid");
    }
    if (this.ditto.deferClose((e2) => {
      const n2 = new WeakRef(this);
      function wrappedObservationHandler(e3) {
        const t2 = n2.deref();
        if (null == t2) return void Logger.debug(`Ignoring change event received by store observer ${i} after it was cancelled`);
        const o2 = Bridge.queryResult.bridge(e3.query_result, () => new QueryResult(e3.query_result));
        Logger.debug(`Invoking user event handler with new event for store observer ${i}`), r(o2, () => t2.signalNext());
      }
      mapFFIErrors(() => {
        i = tryExperimentalRegisterChangeObserver(e2.deref(), t, o, wrappedObservationHandler);
      });
    }), null == i) throw new DittoError("internal", "Internal inconsistency, store observer ID is undefined after registering");
    this.liveQueryID = i;
  }
  async signalNext() {
    const e = this.ditto;
    if (e && !e.isClosed) {
      if (null == this.liveQueryID) throw new Error("live query ID is null while signaling ready for next event");
      return e.deferCloseAsync(async (e2) => {
        Logger.debug(`Signaling availability for live query ${this.liveQueryID}`), await liveQuerySignalAvailableNext(e2.deref(), this.liveQueryID);
      });
    }
  }
};
var CollectionsEvent = class _CollectionsEvent {
  static initial(e) {
    return new _CollectionsEvent({ isInitial: true, collections: e, oldCollections: [], insertions: [], deletions: [], updates: [], moves: [] });
  }
  constructor(e) {
    this.isInitial = e.isInitial, this.collections = e.collections, this.oldCollections = e.oldCollections, this.insertions = e.insertions, this.deletions = e.deletions, this.updates = e.updates, this.moves = e.moves;
  }
};
var PendingCollectionsOperation = class {
  sort(e, t = "ascending") {
    return this.pendingCursorOperation.sort(e, t), this;
  }
  offset(e) {
    return this.pendingCursorOperation.offset(e), this;
  }
  limit(e) {
    return this.pendingCursorOperation.limit(e), this;
  }
  subscribe() {
    return this.pendingCursorOperation.subscribe();
  }
  observeLocal(e) {
    return this._observe(e, false);
  }
  observeLocalWithNextSignal(e) {
    return this._observe(e, true);
  }
  async exec() {
    return collectionsFromDocuments(await this.pendingCursorOperation.exec(), this.store);
  }
  constructor(e) {
    this.store = e, this.pendingCursorOperation = new PendingCursorOperation("true", null, new Collection("__collections", e));
  }
  then(e, t) {
    return this.exec().then(e, t);
  }
  _observe(e, t) {
    const n = new WeakRef(this.store);
    return this.pendingCursorOperation._observe(function(r, i, o) {
      const a = n.deref();
      if (!a) return;
      const s = collectionsFromDocuments(r, a);
      let c;
      if (true === i.isInitial) c = CollectionsEvent.initial(s);
      else {
        const e2 = collectionsFromDocuments(i.oldDocuments, a);
        c = new CollectionsEvent({ isInitial: false, collections: s, oldCollections: e2, insertions: i.insertions, deletions: i.deletions, updates: i.updates, moves: i.moves });
      }
      t ? e(c, o) : e(c);
    }, t);
  }
};
function collectionsFromDocuments(e, t) {
  const n = [];
  for (const r of e) {
    const e2 = r.at("name").value;
    void 0 !== e2 && "string" == typeof e2 && n.push(new Collection(e2, t));
  }
  return n;
}
var WriteTransactionPendingCursorOperation = class extends BasePendingCursorOperation {
  sort(e, t = "ascending") {
    return super.sort(e, t);
  }
  offset(e) {
    return super.offset(e);
  }
  limit(e) {
    return super.limit(e);
  }
  async remove() {
    return this.collection.store.ditto.deferCloseAsync(async (e) => {
      const t = this.query, n = this.collection.writeTransaction, r = (await performAsyncToWorkaroundNonAsyncFFIAPI(async () => collectionRemoveQueryStr(e.deref(), this.collection.name, n.writeTransactionPointer, t, this.queryArgsCBOR, this.orderBys, this.currentLimit, this.currentOffset))).map((e2) => new DocumentID(e2, true));
      return r.forEach((e2) => {
        n.addResult("removed", e2, this.collection.name);
      }), r;
    });
  }
  async evict() {
    return this.collection.store.ditto.deferCloseAsync(async (e) => {
      const t = this.query, n = this.collection.writeTransaction, r = (await performAsyncToWorkaroundNonAsyncFFIAPI(async () => collectionEvictQueryStr(e.deref(), this.collection.name, n.writeTransactionPointer, t, this.queryArgsCBOR, this.orderBys, this.currentLimit, this.currentOffset))).map((e2) => new DocumentID(e2, true));
      return r.forEach((e2) => {
        n.addResult("evicted", e2, this.collection.name);
      }), r;
    });
  }
  async update(e) {
    const t = this.collection.writeTransaction, n = await super.updateWithClosure(e, "write transaction cursor operation update()", t.writeTransactionPointer);
    return n.keys().forEach((e2) => {
      t.addResult("updated", e2, this.collection.name);
    }), n;
  }
  constructor(e, t, n) {
    super(e, t, n);
  }
};
var WriteTransactionPendingIDSpecificOperation = class extends BasePendingIDSpecificOperation {
  async remove() {
    return this.collection.store.ditto.deferCloseAsync(async (e) => {
      const t = this.collection.writeTransaction, n = await performAsyncToWorkaroundNonAsyncFFIAPI(async () => collectionRemove(e.deref(), this.collection.name, t.writeTransactionPointer, this.documentIDCBOR));
      return t.addResult("removed", this.documentID, this.collection.name), n;
    });
  }
  async evict() {
    return this.collection.store.ditto.deferCloseAsync(async (e) => {
      const t = this.collection.writeTransaction, n = await performAsyncToWorkaroundNonAsyncFFIAPI(async () => await collectionEvict(e.deref(), this.collection.name, t.writeTransactionPointer, this.documentIDCBOR));
      return t.addResult("evicted", this.documentID, this.collection.name), n;
    });
  }
  async update(e) {
    const t = this.collection.writeTransaction, n = this.updateWithClosure(e, false, true, "write transaction cursor operation update()", t);
    return t.addResult("updated", this.documentID, this.collection.name), n;
  }
  async updateV2(e) {
    const t = this.collection.writeTransaction, n = this.updateWithClosure(e, true, false, "write transaction cursor operation updateV2()", t);
    return t.addResult("updated", this.documentID, this.collection.name), n;
  }
  async exec() {
    return this.collection.store.ditto.deferCloseAsync(async (e) => await performAsyncToWorkaroundNonAsyncFFIAPI(async () => {
      const t = this.collection.writeTransaction, n = await collectionGetWithWriteTransaction(e.deref(), this.collection.name, this.documentIDCBOR, t.writeTransactionPointer);
      let r;
      return n && (r = Bridge.document.bridge(n)), r;
    }));
  }
  constructor(e, t) {
    super(e, t);
  }
};
var WriteTransactionCollection = class {
  find(e, t) {
    return new WriteTransactionPendingCursorOperation(e, null != t ? t : null, this);
  }
  findAll() {
    return this.find("true");
  }
  findByID(e) {
    const t = e instanceof DocumentID ? e : new DocumentID(e);
    return new WriteTransactionPendingIDSpecificOperation(t, this);
  }
  async upsert(e, t = {}) {
    return this.store.ditto.deferCloseAsync(async (n) => {
      var r;
      const i = null !== (r = t.writeStrategy) && void 0 !== r ? r : "merge", o = desugarJSObject(e), a = CBOR.encode(o), s = await performAsyncToWorkaroundNonAsyncFFIAPI(async () => await collectionInsertValue(n.deref(), this.name, a, i, this.writeTransaction.writeTransactionPointer)), c = new DocumentID(s, true);
      return this.writeTransaction.addResult("inserted", c, this.name), new DocumentID(s, true);
    });
  }
  findByIDCBOR(e) {
    const t = new DocumentID(e, true, true);
    return new WriteTransactionPendingIDSpecificOperation(t, this);
  }
  constructor(e, t, n) {
    this.name = e, this.store = t, this.writeTransaction = n;
  }
};
var WriteTransaction = class _WriteTransaction {
  scoped(e) {
    if ("string" != typeof e) throw new Error("Collection name must be a string");
    return new WriteTransactionCollection(e, this.ditto.store, this);
  }
  constructor(e, t) {
    this.writeTransactionPointer = t, this.ditto = e, this.results = [];
  }
  static async init(e) {
    return e.deferCloseAsync(async (t) => {
      const n = await writeTransaction(t.deref());
      return new _WriteTransaction(e, n);
    });
  }
  async commit() {
    return this.ditto.deferCloseAsync(async (e) => writeTransactionCommit(e.deref(), this.writeTransactionPointer));
  }
  async rollback() {
    return this.ditto.deferCloseAsync(async (e) => writeTransactionRollback(e.deref(), this.writeTransactionPointer));
  }
  addResult(e, t, n) {
    this.results.push({ type: e, docID: t, collectionName: n });
  }
};
var Store = class {
  registerObserver(e, t, n) {
    return this.registerObserverWithSignalNext(e, (e2, n2) => {
      try {
        t(e2);
      } finally {
        n2();
      }
    }, n);
  }
  registerObserverWithSignalNext(e, t, n) {
    if ("string" != typeof e) throw new DittoError("query/invalid", "Expected parameter 'query' to be of type 'string', found: " + typeof e);
    const r = new StoreObserver(this.ditto, e, null != n ? n : null, t);
    return this.observers = Object.freeze([...this.observers, r]), this.ditto.deferCloseAsync(async (e2) => new Promise((t2) => {
      step(async () => {
        try {
          await mapFFIErrorsAsync(async () => await liveQueryStart(e2.deref(), r.liveQueryID));
        } catch (e3) {
          Logger.error(`Failed to start live query: ${e3.message}`);
        }
        t2();
      });
    })), r;
  }
  collection(e) {
    return new Collection(e, this);
  }
  collections() {
    return new PendingCollectionsOperation(this);
  }
  collectionNames() {
    return this.ditto.deferClose((e) => mapFFIErrors(() => dittoGetCollectionNames(e.deref())));
  }
  async execute(e, t) {
    if ("string" != typeof e) throw new DittoError("query/invalid", "Expected parameter 'query' to be of type 'string', found: " + typeof e);
    return this.ditto.deferCloseAsync(async (n) => {
      let r = null;
      if (null != t) try {
        const e2 = desugarJSObject(t);
        r = CBOR.encode(e2);
      } catch (e2) {
        throw new DittoError("query/arguments-invalid", `Unable to encode query arguments: ${e2.message}`);
      }
      const i = await mapFFIErrorsAsync(async () => await performAsyncToWorkaroundNonAsyncFFIAPI(() => tryExecStatement(n.deref(), e, r)));
      return Bridge.queryResult.bridge(i, () => new QueryResult(i));
    });
  }
  async write(e) {
    return this.ditto.deferCloseAsync(async () => {
      const t = await WriteTransaction.init(this.ditto);
      try {
        await e(t);
      } catch (e2) {
        throw await t.rollback(), Logger.warning(`Transaction rolled back due to an error: ${null == e2 ? void 0 : e2.message}`), e2;
      }
      return await t.commit(), t.results;
    });
  }
  async newAttachment(e, t) {
    return null != t && validateAttachmentMetadata(t), this.ditto.deferCloseAsync(async (n) => {
      const { id: r, len: i, handle: o } = await (async () => {
        if ("string" == typeof e) throw new DittoError("sdk/unsupported", "Can't create attachment from file when running in the browser. Please pass the raw data (as a Uint8Array) instead.");
        if (e instanceof Uint8Array) return mapFFIErrorsAsync(async () => await dittoNewAttachmentFromBytes(n.deref(), e), { 1: ["store/failed-to-create-attachment"] });
        throw new Error(`Can't create new attachment, only file path as string or raw data as Uint8Array are supported, but got: ${typeof e}, ${e}`);
      })(), a = { _id: r, _len: i, _meta: { ...t }, [DittoCRDTTypeKey]: DittoCRDTType.attachment }, s = new AttachmentToken(a), c = new Attachment(this.ditto, s);
      return Bridge.attachment.bridge(o, () => c);
    });
  }
  fetchAttachment(e, t) {
    if (null == e) throw new Error("Missing required parameter 'token'");
    let n;
    return n = e instanceof AttachmentToken ? e : new AttachmentToken(e), this.ditto.deferClose(() => {
      const e2 = new AttachmentFetcher(this.ditto, n, null, t);
      return this.attachmentFetchers = Object.freeze([...this.attachmentFetchers, e2]), e2;
    });
  }
  constructor(e) {
    this.observers = Object.freeze([]), this.attachmentFetchers = Object.freeze([]), this.ditto = e;
  }
  unregisterObserver(e) {
    if (e.ditto !== this.ditto) throw new DittoError("internal", "Internal inconsistency, can't remove store observer that does not belong to this store");
    if (!e.isCancelled) throw new DittoError("internal", "Internal inconsistency, can't remove store observer that has not been cancelled");
    const t = this.observers.findIndex((t2) => t2 === e);
    if (-1 === t) return false;
    const n = [...this.observers];
    n.splice(t, 1), this.observers = Object.freeze(n);
    const r = Bridge.ditto.handleFor(this.ditto);
    return this.ditto.deferClose(() => {
      mapFFIErrors(() => liveQueryStop(r.deref(), e.liveQueryID));
    }), true;
  }
  removeAttachmentFetcher(e) {
    if (e.ditto !== this.ditto) throw new DittoError("internal", "Internal inconsistency, can't finalize attachment fetcher that does not belong to this store");
    if (null != e.manager) throw new DittoError("internal", "Internal inconsistency, store can't remove attachment fetcher that is owned by the attachment fetcher manager");
    if (!e.isStopped) throw new DittoError("internal", "Internal inconsistency, can't remove attachment fetcher that has not stopped");
    const t = this.attachmentFetchers.findIndex((t2) => t2 === e);
    if (-1 === t) return false;
    const n = [...this.attachmentFetchers];
    return n.splice(t, 1), this.attachmentFetchers = Object.freeze(n), true;
  }
  close() {
    for (const e of this.observers) e.cancel();
    for (const e of this.attachmentFetchers) e.stop();
  }
  async registerLiveQueryWebhook(e, t, n) {
    return this.ditto.deferCloseAsync(async (r) => {
      const i = validateQuery(t), o = await liveQueryWebhookRegister(r.deref(), e, i, [], 0, 0, n);
      return new DocumentID(o, true);
    });
  }
};
function addressToString(e) {
  return `${e.siteId}-${e.pubkey}`;
}
var Presence = class {
  get connectionRequestHandler() {
    return this._connectionRequestHandler;
  }
  set connectionRequestHandler(e) {
    let t = null;
    if (null != e) {
      if ("function" != typeof e) throw new TypeError(`Expected parameter 'handler' to be a function but got ${typeof e} instead`);
      t = async (t2) => {
        const n2 = Bridge.connectionRequest.bridge(t2), r = await e(n2);
        if ("allow" !== r && "deny" !== r) return Logger.error(`The connection request handler must return "allow" or "deny" but returned "${r}" instead. The connection request will be denied.`), "Deny";
        connectionRequestAuthorize(t2, "allow" === r ? "Allow" : "Deny");
      };
    }
    this._connectionRequestHandler = e;
    const handleError2 = (e2) => {
      Logger.error(`The connection request handler threw an error while handling a connection request, the connection request will be denied. ${e2}`);
    }, n = Bridge.ditto.handleFor(this.ditto);
    this.ditto.deferClose(() => {
      presenceSetConnectionRequestHandler(n.deref(), t, handleError2);
    });
  }
  get graph() {
    return this.ditto.deferClose((e) => {
      const t = dittoPresenceV3(e.deref());
      return JSON.parse(t);
    });
  }
  get peerMetadataJSONString() {
    return this.ditto.deferClose((e) => mapFFIErrors(() => presencePeerMetadataJSON(e.deref())));
  }
  async setPeerMetadataJSONString(e) {
    await this.ditto.deferCloseAsync(async (t) => mapFFIErrorsAsync(async () => presenceTrySetPeerMetadataJSON(t.deref(), e)));
  }
  get peerMetadata() {
    return JSON.parse(this.peerMetadataJSONString);
  }
  async setPeerMetadata(e) {
    let t;
    try {
      t = JSON.stringify(e);
    } catch (e2) {
      throw new DittoError("validation/not-json-compatible", `Failed encoding peer metadata to JSON. ${e2}`);
    }
    await this.setPeerMetadataJSONString(t);
  }
  observe(e) {
    const t = this.observerManager.addObserver(e), n = new Observer(this.observerManager, t, { stopsWhenFinalized: true });
    return e(this.graph), n;
  }
  constructor(e) {
    this._connectionRequestHandler = null, this.ditto = e, this.observerManager = new ObserverManager("PresenceObservation", { keepAlive: e.keepAlive, register: (e2) => {
      this.ditto.deferClose((t) => {
        dittoRegisterPresenceV3Callback(t.deref(), e2);
      });
    }, unregister: () => {
      e.deferCloseAsync(async (e2) => dittoClearPresenceV3Callback(e2.deref()));
    }, process: (e2) => [JSON.parse(e2)] });
  }
  close() {
    this.observerManager.close();
  }
};
var LiveQueryManager = class {
  constructor(e, t) {
    this.finalizationRegistry = new FinalizationRegistry(this.finalize), this.ditto = e, this.keepAlive = t, this.liveQueriesByID = {};
  }
  startLiveQuery(e) {
    this.ditto.deferCloseAsync(async (t) => {
      const n = e.liveQueryID;
      if (!n) throw new Error("Internal inconsistency, tried to add a live query that doesn't have a live query ID (probably stopped).");
      if (this.liveQueriesByID[n]) throw new Error("Internal inconsistency, tried to add a live query with an ID that has already been added.");
      const r = new WeakRef(e);
      return this.liveQueriesByID[n] = r, this.finalizationRegistry.register(e, n, this.finalize), e.liveQueryManager = this, this.ditto.keepAlive.retain(`LiveQuery.${n}`), new Promise((e2, r2) => {
        step(async () => {
          await liveQueryStart(t.deref(), n), e2();
        });
      });
    });
  }
  stopLiveQuery(e) {
    this.finalizationRegistry.unregister(e);
    const t = e.liveQueryID;
    if (!t) throw new Error("Internal inconsistency, tried to remove a live query that doesn't have a live query ID (probably stopped).");
    e.liveQueryManager = null, this.stopLiveQueryWithID(t);
  }
  close() {
    for (const e in this.liveQueriesByID) {
      const t = this.liveQueriesByID[e].deref();
      t && this.stopLiveQuery(t);
    }
  }
  stopLiveQueryWithID(e) {
    this.ditto.deferClose((t) => {
      liveQueryStop(t.deref(), e), this.keepAlive.release(`LiveQuery.${e}`), delete this.liveQueriesByID[e];
    });
  }
  finalize(e) {
    this.stopLiveQueryWithID(e);
  }
};
var PresenceManager = class {
  constructor(e) {
    this.ditto = e, this.isClosed = false, this.isRegistered = false, this.currentRemotePeers = [], this.callbacksByPresenceToken = {};
  }
  addObserver(e) {
    if (this.isClosed) throw new Error("Internal inconsistency, can't add presence observer, observer mananger close()-ed.");
    this.registerIfNeeded();
    const t = cryptoGenerateSecureRandomToken();
    return this.callbacksByPresenceToken[t] = e, this.ditto.keepAlive.retain(`PresenceObservation.${t}`), e(this.currentRemotePeers), t;
  }
  async removeObserver(e) {
    const t = this.callbacksByPresenceToken[e];
    if (void 0 === t) throw new Error(`Can't remove presence observer, token '${e}' has never been registered before.`);
    if (null !== t) return void 0 !== this.callbacksByPresenceToken[e] ? (this.ditto.keepAlive.release(`PresenceObservation.${e}`), this.callbacksByPresenceToken[e] = null, this.unregisterIfNeeded()) : void 0;
  }
  hasObserver(e) {
    return void 0 !== this.callbacksByPresenceToken[e];
  }
  async close() {
    this.isClosed = true;
    const e = Object.keys(this.callbacksByPresenceToken);
    return Promise.all(e.map((e2) => this.removeObserver(e2)));
  }
  hasObservers() {
    return Object.keys(this.callbacksByPresenceToken).length > 0;
  }
  registerIfNeeded() {
    this.ditto.deferClose((e) => {
      if (!this.isRegistered) {
        this.isRegistered = true;
        const t = dittoPresenceV1(e.deref());
        this.currentRemotePeers = this.decode(t).sort(this.compareRemotePeers), dittoRegisterPresenceV1Callback(e.deref(), this.handlePresenceV1Callback.bind(this));
      }
    });
  }
  unregisterIfNeeded() {
    return this.ditto.deferCloseAsync(async (e) => {
      !this.hasObservers() && this.isRegistered && (this.isRegistered = false, await dittoClearPresenceCallback(e.deref()), this.currentRemotePeers = []);
    });
  }
  handlePresenceV1Callback(e) {
    const t = this.decode(e).sort(this.compareRemotePeers);
    this.currentRemotePeers = t, this.notify();
  }
  notify() {
    if (!this.isClosed) for (const e in this.callbacksByPresenceToken) {
      const t = this.callbacksByPresenceToken[e];
      t && t(this.currentRemotePeers);
    }
  }
  decode(e) {
    return JSON.parse(e).map((e2) => {
      var t, n;
      return { networkID: e2.network_id, deviceName: e2.device_name, rssi: null !== (t = e2.rssi) && void 0 !== t ? t : void 0, approximateDistanceInMeters: null !== (n = e2.approximate_distance_in_meters) && void 0 !== n ? n : void 0, connections: e2.connections };
    });
  }
  compareRemotePeers(e, t) {
    return 0 === e.connections.length && t.connections.length > 0 ? 1 : e.connections.length > 0 && 0 === t.connections.length || e.deviceName < t.deviceName ? -1 : e.deviceName > t.deviceName ? 1 : 0;
  }
};
var TransportConditionsManager = class extends ObserverManager {
  constructor(e) {
    super("TransportConditionsObservation", { keepAlive: e.keepAlive }), this.ditto = e;
  }
  register(e) {
    return this.ditto.deferClose((t) => dittoRegisterTransportConditionChangedCallback(t.deref(), e));
  }
  unregister() {
    return this.ditto.deferClose((e) => dittoRegisterTransportConditionChangedCallback(e.deref(), null));
  }
  process(e, t) {
    let n, r;
    switch (e) {
      case "Bluetooth":
        n = "BLE";
        break;
      case "Tcp":
        n = "TCP";
        break;
      case "Awdl":
        n = "AWDL";
        break;
      case "Mdns":
        n = "MDNS";
    }
    switch (t) {
      case "Unknown":
        r = "Unknown";
        break;
      case "Ok":
        r = "OK";
        break;
      case "GenericFailure":
        r = "GenericFailure";
        break;
      case "AppInBackground":
        r = "AppInBackground";
        break;
      case "MdnsFailure":
        r = "MDNSFailure";
        break;
      case "TcpListenFailure":
        r = "TCPListenFailure";
        break;
      case "NoBleCentralPermission":
        r = "NoBLECentralPermission";
        break;
      case "NoBlePeripheralPermission":
        r = "NoBLEPeripheralPermission";
        break;
      case "CannotEstablishConnection":
        r = "CannotEstablishConnection";
        break;
      case "BleDisabled":
        r = "BLEDisabled";
        break;
      case "NoBleHardware":
        r = "NoBLEHardware";
        break;
      case "WifiDisabled":
        r = "WiFiDisabled";
        break;
      case "TemporarilyUnavailable":
        r = "TemporarilyUnavailable";
    }
    return [r, n];
  }
};
var SyncSubscription = class {
  get isCancelled() {
    return this._isCancelled;
  }
  cancel() {
    this._isCancelled || (this._isCancelled = true, this.ditto.sync.unregisterSubscription(this));
  }
  constructor(e, t, n, r) {
    if (this._isCancelled = false, null == n != (null == r)) throw new DittoError("internal", "Internal inconsistency, query arguments and query arguments CBOR must be both null or both non-null", { queryArguments: n, queryArgumentsCBOR: r });
    this.ditto = e, this.queryString = t, this.queryArguments = n ? Object.freeze({ ...n }) : void 0, this.queryArgumentsCBOR = r;
  }
};
var Sync = class {
  registerSubscription(e, t) {
    if ("string" != typeof e) throw new DittoError("query/invalid", "Expected parameter 'query' to be of type 'string', found: " + typeof e);
    let n = null;
    if (null != t) try {
      const e2 = desugarJSObject(t);
      n = CBOR.encode(e2);
    } catch (e2) {
      throw new DittoError("query/arguments-invalid", `Unable to encode query arguments: ${e2.message}`);
    }
    this.ditto.deferClose((t2) => {
      mapFFIErrors(() => tryAddSyncSubscription(t2.deref(), e, n));
    });
    const r = new SyncSubscription(this.ditto, e, t || null, n);
    return this.subscriptions = Object.freeze([...this.subscriptions, r]), r;
  }
  constructor(e) {
    this.subscriptions = Object.freeze([]), this.ditto = e;
  }
  unregisterSubscription(e) {
    if (e.ditto !== this.ditto) throw new DittoError("internal", "Can't remove replication subscription that does not belong to this store");
    if (!e.isCancelled) throw new DittoError("internal", "Internal inconsistency, can't remove replication subscription that has not been cancelled");
    const t = this.subscriptions.findIndex((t2) => t2 === e);
    if (-1 === t) return false;
    const n = [...this.subscriptions];
    return n.splice(t, 1), this.subscriptions = Object.freeze(n), this.ditto.deferClose((t2) => {
      mapFFIErrors(() => tryRemoveSyncSubscription(t2.deref(), e.queryString, e.queryArgumentsCBOR));
    }), true;
  }
  close() {
    for (const e of this.subscriptions) e.cancel();
  }
};
var SubscriptionManager = class {
  constructor(e) {
    this.ditto = e, this.subscriptions = {}, this.finalizationRegistry = new FinalizationRegistry(this.removeWithContextInfo.bind(this));
  }
  add(e) {
    const t = e.contextInfo;
    this.ditto.deferClose((n) => {
      this.subscriptions[t.id] = new WeakRef(e), this.finalizationRegistry.register(e, e.contextInfo, e), addSubscription(n.deref(), t.collectionName, t.query, t.queryArgsCBOR, t.orderBys, t.limit, t.offset);
    });
  }
  remove(e) {
    if (null == this.subscriptions[e.contextInfo.id]) throw new Error(`Internal inconsistency, tried to remove a subscription that is not tracked: ${e.contextInfo.id}`);
    this.finalizationRegistry.unregister(e), this.removeWithContextInfo(e.contextInfo);
  }
  close() {
    this.ditto.deferClose(() => {
      for (const e in this.subscriptions) {
        const t = this.subscriptions[e].deref();
        null == t || t.cancel();
      }
    });
  }
  removeWithContextInfo(e) {
    this.ditto.deferClose((t) => {
      delete this.subscriptions[e.id], removeSubscription(t.deref(), e.collectionName, e.query, e.queryArgsCBOR, e.orderBys, e.limit, e.offset);
    });
  }
};
var AttachmentFetcherManager = class {
  constructor(e) {
    this.contextInfoByID = {}, this.finalizationRegistry = new FinalizationRegistry(this.stopWithContextInfo.bind(this)), this.ditto = e;
  }
  startAttachmentFetcher(e, t) {
    return this.ditto.deferClose(() => {
      const n = new AttachmentFetcher(this.ditto, e, this, t), r = { id: n.id, attachmentTokenID: e.idBytes, cancelTokenPromise: n.cancelTokenPromise, attachmentFetcher: new WeakRef(n) };
      this.finalizationRegistry.register(n, r, n), this.contextInfoByID[n.id] = r;
      const resetCancelToken = () => {
        null != this.contextInfoByID[n.id] && (this.contextInfoByID[n.id].cancelTokenPromise = null);
      };
      return n.attachment.then((e2) => (resetCancelToken(), e2), (e2) => (resetCancelToken(), e2)), this.ditto.keepAlive.retain(`AttachmentFetcher.${n.id})`), n;
    });
  }
  async stopAttachmentFetcher(e) {
    this.finalizationRegistry.unregister(e);
    const t = this.contextInfoByID[e.id];
    if (null == t) throw new Error(`Internal inconsistency: cannot stop attachment fetcher ${e.id}, which is not registered.`);
    await this.stopWithContextInfo(t);
  }
  close() {
    this.ditto.deferCloseAsync(async () => {
      const e = Object.values(this.contextInfoByID).map(async (e2) => {
        const t = e2.attachmentFetcher.deref();
        null != t && await this.stopAttachmentFetcher(t);
      });
      await Promise.all(e);
    });
  }
  stopWithContextInfo(e) {
    return this.ditto.deferCloseAsync(async (t) => {
      if (null == this.contextInfoByID[e.id]) throw new Error(`Internal inconsistency: attachment fetcher ${e.id} not found in active attachment fetchers.`);
      delete this.contextInfoByID[e.id], this.ditto.keepAlive.release(`AttachmentFetcher.${e.id})`);
      const n = await e.cancelTokenPromise;
      n && dittoCancelResolveAttachment(t.deref(), e.attachmentTokenID, n);
    });
  }
};
var SmallPeerInfo = class {
  get isEnabled() {
    return this.ditto.deferClose((e) => dittoSmallPeerInfoGetIsEnabled(e.deref()));
  }
  set isEnabled(e) {
    if ("boolean" != typeof e) throw new TypeError("Expected boolean, got " + typeof e);
    this.ditto.deferCloseAsync(async (t) => dittoSmallPeerInfoSetEnabled(t.deref(), e));
  }
  get metadata() {
    return JSON.parse(this.metadataJSONString);
  }
  set metadata(e) {
    this.metadataJSONString = JSON.stringify(e);
  }
  get metadataJSONString() {
    return this.ditto.deferClose((e) => dittoSmallPeerInfoGetMetadata(e.deref()));
  }
  set metadataJSONString(e) {
    if ("string" != typeof e) throw new TypeError("Expected string, got " + typeof e);
    this.ditto.deferClose((t) => {
      dittoSmallPeerInfoSetMetadata(t.deref(), e);
    });
  }
  async getSyncScope() {
    return this.ditto.deferCloseAsync(async (e) => dittoSmallPeerInfoGetSyncScope(e.deref()));
  }
  async setSyncScope(e) {
    return this.ditto.deferCloseAsync(async (t) => dittoSmallPeerInfoSetSyncScope(t.deref(), e));
  }
  constructor(e) {
    this.ditto = e;
  }
};
var Ditto = class _Ditto {
  static get VERSION() {
    return dittoGetSDKSemver();
  }
  get deviceName() {
    return this._deviceName;
  }
  set deviceName(e) {
    this.isSyncActive && Logger.warning("Changes to the device name take effect when sync is restarted."), this._deviceName = e;
  }
  get sdkVersion() {
    return this.deferClose((e) => dittoGetSDKVersion(e.deref()));
  }
  get path() {
    return Logger.warning("⚠️ Deprecation Warning: The 'Ditto.path' property is deprecated. Please update your code to use the new 'Ditto.persistenceDirectory' property instead."), this.persistenceDirectory;
  }
  get isActivated() {
    return this.deferClose((e) => dittoIsActivated(e.deref()));
  }
  get isClosed() {
    var e;
    return null !== (e = this._isClosed) && void 0 !== e && e;
  }
  get isSyncActive() {
    return this.deferClose((e) => dittoIsSyncActive(e.deref()));
  }
  constructor(e, t) {
    var n, r;
    if (this.deferCloseAllowed = true, this._isClosed = false, this.pendingOperations = /* @__PURE__ */ new Set(), !_Ditto.isEnvironmentSupported()) throw new Error("Ditto does not support this JavaScript environment. Please consult the Ditto JavaScript documentation for a list of supported environments and browsers. You can use `Ditto.isEnvironmentSupported()` to run this check anytime.");
    loggerInit(), this.persistenceDirectory = _Ditto.initPersistenceDirectory(t);
    const i = null != e ? e : { type: "offlinePlayground", appID: "" }, o = Object.freeze(this.validateIdentity(i));
    this.identity = Object.freeze(o), this._deviceName = navigator.userAgent, this.keepAlive = new KeepAlive();
    let a = null;
    const s = new WeakRef(this), c = (() => {
      var e2, t2, n2;
      if ("offlinePlayground" === o.type) return dittoIdentityConfigMakeOfflinePlayground(o.appID, null !== (e2 = o.siteID) && void 0 !== e2 ? e2 : 0);
      if ("manual" === o.type) return dittoIdentityConfigMakeManual(o.certificate);
      if ("sharedKey" === o.type) return dittoIdentityConfigMakeSharedKey(o.appID, o.sharedKey, o.siteID);
      if ("onlinePlayground" === o.type) {
        const e3 = null !== (t2 = o.customAuthURL) && void 0 !== t2 ? t2 : defaultAuthURL(o.appID);
        return dittoIdentityConfigMakeOnlinePlayground(o.appID, o.token, e3);
      }
      if ("onlineWithAuthentication" === o.type) {
        const e3 = null !== (n2 = o.customAuthURL) && void 0 !== n2 ? n2 : defaultAuthURL(o.appID);
        return dittoIdentityConfigMakeOnlineWithAuthentication(o.appID, e3);
      }
      throw new Error(`Can't create Ditto, unsupported identity type: ${o}`);
    })(), l = dittoMakeWithTransportConfigMode(this.persistenceDirectory, c, "Disabled", "PlatformDependent"), u = dittoAuthClientGetAppID(l), d = dittoAuthClientGetSiteID(l);
    Bridge.ditto.bridge(l, this);
    let f = false;
    if ("onlineWithAuthentication" === o.type) {
      f = null === (n = o.enableDittoCloudSync) || void 0 === n || n, this.auth = new OnlineAuthenticator(this.keepAlive, this, o.authHandler);
      dittoAuthSetLoginProvider(l, dittoAuthClientMakeLoginProvider(function(e2) {
        const t2 = s.deref();
        t2 ? t2.auth ? t2.auth["@ditto.authenticationExpiring"](e2) : a = e2 : Logger.warning("Internal inconsistency, LoginProvider callback fired after the corresponding Ditto instance has been deallocated.");
      }));
    } else "onlinePlayground" === o.type ? (f = null === (r = o.enableDittoCloudSync) || void 0 === r || r, this.auth = new OnlineAuthenticator(this.keepAlive, this, { authenticationRequired: function(e2) {
    }, authenticationExpiringSoon: function(e2, t2) {
    } })) : this.auth = new NotAvailableAuthenticator(this.keepAlive);
    dittoSetCloudSyncEnabled(l, f), transportsInit(), this.appID = u, this.siteID = d, this.sync = new Sync(this), this.store = new Store(this), this.smallPeerInfo = new SmallPeerInfo(this), this.presence = new Presence(this), this.presenceManager = new PresenceManager(this), this.liveQueryManager = new LiveQueryManager(this, this.keepAlive), this.attachmentFetcherManager = new AttachmentFetcherManager(this), this.transportConditionsManager = new TransportConditionsManager(this), this.subscriptionManager = new SubscriptionManager(this), null != a && this.auth["@ditto.authenticationExpiring"](a);
  }
  static disableDeadlockDetection() {
  }
  static hasDeadlockDetection() {
    return false;
  }
  static isEnvironmentSupported() {
    let e, t = false;
    "undefined" != typeof window && window.navigator && window.navigator.userAgent && window.navigator.appVersion && (t = -1 !== window.navigator.userAgent.indexOf("MSIE") || window.navigator.appVersion.indexOf("Trident/") > -1);
    try {
      e = checkAPIs();
    } catch (e2) {
      throw new Error(`Error checking environment support: ${e2}`);
    }
    return !t && e;
  }
  static initPersistenceDirectory(e) {
    let t;
    if (null == e) t = "ditto";
    else {
      if (0 === e.trim().length) throw new Error(`Invalid argument for path parameter: '${e}'`);
      t = e;
    }
    return t;
  }
  setOfflineOnlyLicenseToken(e) {
    Logger.info("Offline license token are ignored on web builds. Token validation will be skipped."), IdentityTypesRequiringOfflineLicenseToken.includes(this.identity.type) ? this.deferClose((t) => {
      mapFFIErrors(() => {
        tryVerifyLicense(t.deref(), e);
      });
    }) : Logger.error(`The identity type '${this.identity.type}' does not require an offline license token.`);
  }
  get transportConfig() {
    return this.deferClose((e) => {
      const t = dittoTransportConfig(e.deref());
      return transportConfigFromDeserializable(CBOR.decode(t)).freeze();
    });
  }
  setTransportConfig(e) {
    const t = transportConfigToSerializable(e.copy().freeze()), n = CBOR.encode(t);
    this.deferClose((e2) => {
      dittoSetTransportConfig(e2.deref(), n);
    });
  }
  updateTransportConfig(e) {
    const t = this.transportConfig.copy();
    return e(t), this.setTransportConfig(t), this;
  }
  startSync() {
    this.deferClose((e) => {
      if (IdentityTypesRequiringOfflineLicenseToken.includes(this.identity.type) && !this.isActivated) throw new Error("Sync could not be started because Ditto has not yet been activated. This can be achieved with a successful call to `setOfflineOnlyLicenseToken`. If you need to obtain a license token then please visit https://portal.ditto.live.");
      this.isSyncActive || this.keepAlive.retain("sync"), this._deviceName = dittoSetDeviceName(e.deref(), this.deviceName), dittoStartSync(e.deref());
    });
  }
  stopSync() {
    this.deferClose((e) => {
      this.isSyncActive && this.keepAlive.release("sync"), dittoStopSync(e.deref());
    });
  }
  observePeers(e) {
    Logger.warning("`ditto.observePeers()` is deprecated, please use `ditto.presence.observe()` instead.");
    const t = this.presenceManager.addObserver(e);
    return new Observer(this.presenceManager, t, { stopsWhenFinalized: true });
  }
  observeTransportConditions(e) {
    const t = this.transportConditionsManager.addObserver(e);
    return new Observer(this.transportConditionsManager, t, { stopsWhenFinalized: true });
  }
  async runGarbageCollection() {
    return this.deferCloseAsync(async (e) => dittoRunGarbageCollection(e.deref()));
  }
  async disableSyncWithV3() {
    return this.deferCloseAsync(async (e) => {
      await dittoDisableSyncWithV3(e.deref());
    });
  }
  async close() {
    if (!this.isClosed) {
      if (this._isClosed = true, this.stopSync(), this.store.close(), this.presence.close(), this.auth.close(), this.sync.close(), await this.presenceManager.close(), this.liveQueryManager.close(), this.attachmentFetcherManager.close(), this.transportConditionsManager.close(), this.subscriptionManager.close(), this.keepAlive.isActive) throw new Error("Internal inconsistency, still kept alive after the Ditto object has been close()-ed. ");
      do {
        await Promise.allSettled(this.pendingOperations);
      } while (this.pendingOperations.size > 0);
      this.deferCloseAllowed = false, await Bridge.ditto.close(this);
    }
  }
  get numPendingOperations() {
    return this.pendingOperations.size;
  }
  deferClose(e) {
    if (!this.deferCloseAllowed) throw new Error("Can't perform operation using a Ditto instance that has been closed.");
    return e(Bridge.ditto.handleFor(this));
  }
  async deferCloseAsync(e) {
    if (!this.deferCloseAllowed) throw new Error("Can't perform operation using a Ditto instance that has been closed.");
    const t = e(Bridge.ditto.handleFor(this));
    let n;
    this.pendingOperations.add(t);
    try {
      n = await t;
    } finally {
      this.pendingOperations.delete(t);
    }
    return n;
  }
  validateIdentity(e) {
    const t = { ...e }, n = e.appID;
    if (!["offlinePlayground", "sharedKey", "manual", "onlinePlayground", "onlineWithAuthentication"].includes(e.type)) throw new Error(`Can't create Ditto instance, unknown identity type: ${e.type}`);
    if (("offlinePlayground" === e.type || "sharedKey" === e.type || "onlinePlayground" === e.type || "onlineWithAuthentication" === e.type) && void 0 === n) throw new Error("Property .appID must be given for identity, but isn't.");
    if (void 0 !== n && "string" != typeof n) throw new Error(`Property .appID must be be of type string, but is of type '${typeof n}': ${n}`);
    if (("offlinePlayground" === e.type || "sharedKey" === e.type) && void 0 !== e.siteID) {
      const t2 = e.siteID;
      if (!("number" == typeof t2 || "bigint" == typeof t2)) throw new Error("Can't create Ditto instance, siteID must be a number or BigInt");
      if (t2 < 0) throw new Error("Can't create Ditto instance, siteID must be >= 0");
      if (t2 > BigInt("0xffffffffffffffff")) throw new Error("Can't create Ditto instance, siteID must be < 2^64");
    }
    if (e.type, e.type, "onlinePlayground" === e.type) {
      const t2 = e.token;
      if (void 0 === t2) throw new Error("Property .token must be given for identity but isn't. You can find the corresponding token on the Ditto Portal.");
      if (void 0 !== t2 && "string" != typeof t2) throw new Error(`Property .token of identity must be be of type string, but is of type '${typeof t2}': ${t2}`);
    }
    return e.type, t;
  }
};
var checkAPIs = (e) => {
  const t = e || globalThis || global || window;
  return ["BigInt", "WeakRef", "FinalizationRegistry"].every((e2) => !!t[e2]);
};
var disableDeadlockTimeoutWhenDebugging = () => {
};
var CUSTOM_INSPECT_SYMBOL = Symbol.for("nodejs.util.inspect.custom");
var QueryResultItem = class {
  get value() {
    if (this.materialize(), void 0 === this.materializedValue) throw new Error("Internal Error: Materialized value is undefined");
    return this.materializedValue;
  }
  get isMaterialized() {
    return void 0 !== this.materializedValue;
  }
  materialize() {
    if (!this.isMaterialized) {
      const e = this.cborData();
      let t;
      try {
        t = CBOR.decode(e);
      } catch (e2) {
        throw new Error(`Internal inconsistency: CBOR decoding error while materializing result item: ${e2.message}`);
      }
      if (void 0 === t) throw new Error("Internal inconsistency: Materialized value is undefined");
      this.materializedValue = t;
    }
  }
  dematerialize() {
    this.materializedValue = void 0;
  }
  cborData() {
    return queryResultItemCBOR(Bridge.queryResultItem.handleFor(this).deref());
  }
  jsonString() {
    return queryResultItemJSON(Bridge.queryResultItem.handleFor(this).deref());
  }
  [CUSTOM_INSPECT_SYMBOL](e, t, n) {
    return customInspectRepresentation(this, n);
  }
  constructor() {
  }
};
function getBridgeLoad() {
  const e = {};
  return Bridge.all.map((t) => {
    const n = t.deref();
    return n ? 0 === n.count ? null : void (e[n.type.name] = n.count) : null;
  }), e;
}
Bridge.attachment.registerType(Attachment), Bridge.connectionRequest.registerType(ConnectionRequest), Bridge.document.registerType(Document), Bridge.queryResultItem.registerType(QueryResultItem), Bridge.queryResult.registerType(QueryResult), Bridge.mutableDocument.registerType(MutableDocument), Bridge.ditto.registerType(Ditto);
export {
  Attachment,
  AttachmentFetcher,
  AttachmentToken,
  AuthenticationStatus,
  Authenticator,
  BasePendingCursorOperation,
  BasePendingIDSpecificOperation,
  CBOR,
  Collection,
  CollectionsEvent,
  ConnectionRequest,
  Counter,
  Ditto,
  DittoError,
  Document,
  DocumentID,
  DocumentPath,
  ERROR_CODES,
  IdentityTypesRequiringOfflineLicenseToken,
  KeepAlive,
  LiveQuery,
  LiveQueryEventInitial,
  LiveQueryEventUpdate,
  Logger,
  MutableCounter,
  MutableDocument,
  MutableDocumentPath,
  MutableRegister,
  NotAvailableAuthenticator,
  Observer,
  OnlineAuthenticator,
  PendingCollectionsOperation,
  PendingCursorOperation,
  PendingIDSpecificOperation,
  Presence,
  QueryResult,
  QueryResultItem,
  Register,
  SingleDocumentLiveQueryEvent,
  SmallPeerInfo,
  Store,
  StoreObserver,
  Subscription,
  Sync,
  SyncSubscription,
  TransportConfig,
  UpdateResult,
  UpdateResultsMap,
  WriteTransaction,
  WriteTransactionCollection,
  WriteTransactionPendingCursorOperation,
  WriteTransactionPendingIDSpecificOperation,
  addressToString,
  checkAPIs,
  disableDeadlockTimeoutWhenDebugging,
  getBridgeLoad,
  init,
  mapFFIErrors,
  mapFFIErrorsAsync,
  transportConfigFromDeserializable,
  transportConfigToSerializable,
  validateAttachmentMetadata,
  validateDocumentIDCBOR,
  validateDocumentIDValue
};
//# sourceMappingURL=@dittolive_ditto.js.map
