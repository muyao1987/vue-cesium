define([
  './Matrix2-9aa31791',
  './when-4bbc8319',
  './EllipseGeometry-47331b4e',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './WebGLConstants-1c8239cc',
  './GeometryOffsetAttribute-1772960d',
  './Transforms-d13cc04e',
  './combine-83860057',
  './EllipseGeometryLibrary-962723df',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './GeometryInstance-47b34185',
  './GeometryPipeline-2356afec',
  './AttributeCompression-af389d04',
  './EncodedCartesian3-f286cedc',
  './IndexDatatype-b7d979a6',
  './IntersectionTests-96a04219',
  './Plane-318d6937',
  './VertexFormat-71718faa'
], function (e, t, r, n, i, a, o, c, s, d, l, m, p, y, b, f, u, G, E, C) {
  'use strict'
  return function (n, i) {
    return (
      t.defined(i) && (n = r.EllipseGeometry.unpack(n, i)),
      (n._center = e.Cartesian3.clone(n._center)),
      (n._ellipsoid = e.Ellipsoid.clone(n._ellipsoid)),
      r.EllipseGeometry.createGeometry(n)
    )
  }
})
