# Changes

## New Stores

[x] model attribute's ownerhip with traversable back references
    [x] Model and Collection first assigned to model attributes hold back `_owner` reference
    [x] `_owner` is cleared when object is removed from an attribute.
[ ] Model's attribute proxies
    - Type.has.proxy() spec will create native properties linked to attribute's properties.
    - Type.has.proxy('a b c') will link only listed properties.
[x] Store base class for model, which is used as store.
    [x] Model.getStore() method returns closest store performing ownership traversal, or return global one.
    [x] All I/O is delegated to enclosing store's sync, if it's not the store.
    [x] New Model.from and Collection.subsetOf references resolution algorithm
        [x] for references started from `store.*` getStore() locator is used.
        [x] when no item is located in store, item from global default store is returned.
[x] LazyStore container of distinctive REST endpoints.
    [x] autoload items on first access
    [x] may clear and fetch all or individual items
[x] Nested.store now accepts object instance, not the spec.

## ES6 classes



# Rationale

- Create multiple stores in a system.
- Put stores in hierarchy.
- Allow dynamic stores creation.