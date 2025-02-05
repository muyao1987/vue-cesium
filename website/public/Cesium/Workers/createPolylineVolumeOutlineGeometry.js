define([
  './when-4bbc8319',
  './Matrix2-9aa31791',
  './arrayRemoveDuplicates-18786327',
  './BoundingRectangle-218a9c7b',
  './Transforms-d13cc04e',
  './ComponentDatatype-93750d1a',
  './PolylineVolumeGeometryLibrary-06826ae8',
  './RuntimeError-346a3079',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6',
  './PolygonPipeline-da7fc5ca',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './EllipsoidTangentPlane-eecce7e8',
  './AxisAlignedBoundingBox-07c6b7f2',
  './IntersectionTests-96a04219',
  './Plane-318d6937',
  './PolylinePipeline-64021a2e',
  './EllipsoidGeodesic-dd8f2afb',
  './EllipsoidRhumbLine-30c47ff4'
], function (e, i, n, a, t, r, o, l, s, p, d, c, u, y, g, h, f, m, v, E, P) {
  'use strict'
  function _(n) {
    var a = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).polylinePositions,
      t = n.shapePositions
    ;(this._positions = a),
      (this._shape = t),
      (this._ellipsoid = i.Ellipsoid.clone(e.defaultValue(n.ellipsoid, i.Ellipsoid.WGS84))),
      (this._cornerType = e.defaultValue(n.cornerType, o.CornerType.ROUNDED)),
      (this._granularity = e.defaultValue(n.granularity, r.CesiumMath.RADIANS_PER_DEGREE)),
      (this._workerName = 'createPolylineVolumeOutlineGeometry')
    var l = 1 + a.length * i.Cartesian3.packedLength
    ;(l += 1 + t.length * i.Cartesian2.packedLength), (this.packedLength = l + i.Ellipsoid.packedLength + 2)
  }
  _.pack = function (n, a, t) {
    var r
    t = e.defaultValue(t, 0)
    var o = n._positions,
      l = o.length
    for (a[t++] = l, r = 0; r < l; ++r, t += i.Cartesian3.packedLength) i.Cartesian3.pack(o[r], a, t)
    var s = n._shape
    for (l = s.length, a[t++] = l, r = 0; r < l; ++r, t += i.Cartesian2.packedLength) i.Cartesian2.pack(s[r], a, t)
    return i.Ellipsoid.pack(n._ellipsoid, a, t), (t += i.Ellipsoid.packedLength), (a[t++] = n._cornerType), (a[t] = n._granularity), a
  }
  var k = i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),
    b = { polylinePositions: void 0, shapePositions: void 0, ellipsoid: k, height: void 0, cornerType: void 0, granularity: void 0 }
  _.unpack = function (n, a, t) {
    var r
    a = e.defaultValue(a, 0)
    var o = n[a++],
      l = new Array(o)
    for (r = 0; r < o; ++r, a += i.Cartesian3.packedLength) l[r] = i.Cartesian3.unpack(n, a)
    o = n[a++]
    var s = new Array(o)
    for (r = 0; r < o; ++r, a += i.Cartesian2.packedLength) s[r] = i.Cartesian2.unpack(n, a)
    var p = i.Ellipsoid.unpack(n, a, k)
    a += i.Ellipsoid.packedLength
    var d = n[a++],
      c = n[a]
    return e.defined(t)
      ? ((t._positions = l), (t._shape = s), (t._ellipsoid = i.Ellipsoid.clone(p, t._ellipsoid)), (t._cornerType = d), (t._granularity = c), t)
      : ((b.polylinePositions = l), (b.shapePositions = s), (b.cornerType = d), (b.granularity = c), new _(b))
  }
  var C = new a.BoundingRectangle()
  return (
    (_.createGeometry = function (e) {
      var l = e._positions,
        u = n.arrayRemoveDuplicates(l, i.Cartesian3.equalsEpsilon),
        y = e._shape
      if (((y = o.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y)), !(u.length < 2 || y.length < 3))) {
        c.PolygonPipeline.computeWindingOrder2D(y) === c.WindingOrder.CLOCKWISE && y.reverse()
        var g = a.BoundingRectangle.fromPoints(y, C)
        return (function (e, i) {
          var n = new p.GeometryAttributes()
          n.position = new s.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: e })
          var a,
            o,
            l = i.length,
            c = n.position.values.length / 3,
            u = e.length / 3 / l,
            y = d.IndexDatatype.createTypedArray(c, 2 * l * (u + 1)),
            g = 0,
            h = (a = 0) * l
          for (o = 0; o < l - 1; o++) (y[g++] = o + h), (y[g++] = o + h + 1)
          for (y[g++] = l - 1 + h, y[g++] = h, h = (a = u - 1) * l, o = 0; o < l - 1; o++) (y[g++] = o + h), (y[g++] = o + h + 1)
          for (y[g++] = l - 1 + h, y[g++] = h, a = 0; a < u - 1; a++) {
            var f = l * a,
              m = f + l
            for (o = 0; o < l; o++) (y[g++] = o + f), (y[g++] = o + m)
          }
          return new s.Geometry({
            attributes: n,
            indices: d.IndexDatatype.createTypedArray(c, y),
            boundingSphere: t.BoundingSphere.fromVertices(e),
            primitiveType: s.PrimitiveType.LINES
          })
        })(o.PolylineVolumeGeometryLibrary.computePositions(u, y, g, e, !1), y)
      }
    }),
    function (n, a) {
      return e.defined(a) && (n = _.unpack(n, a)), (n._ellipsoid = i.Ellipsoid.clone(n._ellipsoid)), _.createGeometry(n)
    }
  )
})
