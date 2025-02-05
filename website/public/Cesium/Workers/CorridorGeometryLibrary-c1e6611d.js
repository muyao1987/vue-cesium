define([
  'exports',
  './Matrix2-9aa31791',
  './PolylineVolumeGeometryLibrary-06826ae8',
  './when-4bbc8319',
  './ComponentDatatype-93750d1a',
  './PolylinePipeline-64021a2e',
  './Transforms-d13cc04e'
], function (a, e, r, n, t, i, s) {
  'use strict'
  var o = {},
    C = new e.Cartesian3(),
    l = new e.Cartesian3(),
    y = new e.Cartesian3(),
    u = new e.Cartesian3(),
    c = [new e.Cartesian3(), new e.Cartesian3()],
    d = new e.Cartesian3(),
    p = new e.Cartesian3(),
    m = new e.Cartesian3(),
    g = new e.Cartesian3(),
    h = new e.Cartesian3(),
    f = new e.Cartesian3(),
    w = new e.Cartesian3(),
    x = new e.Cartesian3(),
    z = new e.Cartesian3(),
    v = new e.Cartesian3(),
    P = new s.Quaternion(),
    A = new e.Matrix3()
  function B(a, n, i, o, y) {
    var u,
      c = e.Cartesian3.angleBetween(e.Cartesian3.subtract(n, a, C), e.Cartesian3.subtract(i, a, l)),
      d = o === r.CornerType.BEVELED ? 1 : Math.ceil(c / t.CesiumMath.toRadians(5)) + 1,
      p = 3 * d,
      m = new Array(p)
    ;(m[p - 3] = i.x),
      (m[p - 2] = i.y),
      (m[p - 1] = i.z),
      (u = y
        ? e.Matrix3.fromQuaternion(s.Quaternion.fromAxisAngle(e.Cartesian3.negate(a, C), c / d, P), A)
        : e.Matrix3.fromQuaternion(s.Quaternion.fromAxisAngle(a, c / d, P), A))
    var g = 0
    n = e.Cartesian3.clone(n, C)
    for (var h = 0; h < d; h++) (n = e.Matrix3.multiplyByVector(u, n, n)), (m[g++] = n.x), (m[g++] = n.y), (m[g++] = n.z)
    return m
  }
  function E(a, r, n, t) {
    var i = C
    return t || (r = e.Cartesian3.negate(r, r)), [(i = e.Cartesian3.add(a, r, i)).x, i.y, i.z, n.x, n.y, n.z]
  }
  function S(a, r, n, t) {
    for (
      var i = new Array(a.length),
        s = new Array(a.length),
        o = e.Cartesian3.multiplyByScalar(r, n, C),
        c = e.Cartesian3.negate(o, l),
        d = 0,
        p = a.length - 1,
        m = 0;
      m < a.length;
      m += 3
    ) {
      var g = e.Cartesian3.fromArray(a, m, y),
        h = e.Cartesian3.add(g, c, u)
      ;(i[d++] = h.x), (i[d++] = h.y), (i[d++] = h.z)
      var f = e.Cartesian3.add(g, o, u)
      ;(s[p--] = f.z), (s[p--] = f.y), (s[p--] = f.x)
    }
    return t.push(i, s), t
  }
  o.addAttribute = function (a, e, r, t) {
    var i = e.x,
      s = e.y,
      o = e.z
    n.defined(r) && ((a[r] = i), (a[r + 1] = s), (a[r + 2] = o)), n.defined(t) && ((a[t] = o), (a[t - 1] = s), (a[t - 2] = i))
  }
  var b = new e.Cartesian3(),
    D = new e.Cartesian3()
  ;(o.computePositions = function (a) {
    var n = a.granularity,
      s = a.positions,
      o = a.ellipsoid,
      l = a.width / 2,
      y = a.cornerType,
      u = a.saveAttributes,
      P = d,
      A = p,
      M = m,
      T = g,
      N = h,
      L = f,
      O = w,
      R = x,
      V = z,
      Q = v,
      U = [],
      G = u ? [] : void 0,
      I = u ? [] : void 0,
      q = s[0],
      j = s[1]
    ;(A = e.Cartesian3.normalize(e.Cartesian3.subtract(j, q, A), A)),
      (P = o.geodeticSurfaceNormal(q, P)),
      (T = e.Cartesian3.normalize(e.Cartesian3.cross(P, A, T), T)),
      u && (G.push(T.x, T.y, T.z), I.push(P.x, P.y, P.z)),
      (O = e.Cartesian3.clone(q, O)),
      (q = j),
      (M = e.Cartesian3.negate(A, M))
    var k,
      F,
      H = [],
      J = s.length
    for (k = 1; k < J - 1; k++) {
      ;(P = o.geodeticSurfaceNormal(q, P)),
        (j = s[k + 1]),
        (A = e.Cartesian3.normalize(e.Cartesian3.subtract(j, q, A), A)),
        (N = e.Cartesian3.normalize(e.Cartesian3.add(A, M, N), N))
      var K = e.Cartesian3.multiplyByScalar(P, e.Cartesian3.dot(A, P), b)
      e.Cartesian3.subtract(A, K, K), e.Cartesian3.normalize(K, K)
      var W = e.Cartesian3.multiplyByScalar(P, e.Cartesian3.dot(M, P), D)
      if (
        (e.Cartesian3.subtract(M, W, W),
        e.Cartesian3.normalize(W, W),
        !t.CesiumMath.equalsEpsilon(Math.abs(e.Cartesian3.dot(K, W)), 1, t.CesiumMath.EPSILON7))
      ) {
        ;(N = e.Cartesian3.cross(N, P, N)), (N = e.Cartesian3.cross(P, N, N)), (N = e.Cartesian3.normalize(N, N))
        var X = l / Math.max(0.25, e.Cartesian3.magnitude(e.Cartesian3.cross(N, M, C))),
          Y = r.PolylineVolumeGeometryLibrary.angleIsGreaterThanPi(A, M, q, o)
        ;(N = e.Cartesian3.multiplyByScalar(N, X, N)),
          Y
            ? ((R = e.Cartesian3.add(q, N, R)),
              (Q = e.Cartesian3.add(R, e.Cartesian3.multiplyByScalar(T, l, Q), Q)),
              (V = e.Cartesian3.add(R, e.Cartesian3.multiplyByScalar(T, 2 * l, V), V)),
              (c[0] = e.Cartesian3.clone(O, c[0])),
              (c[1] = e.Cartesian3.clone(Q, c[1])),
              (U = S(i.PolylinePipeline.generateArc({ positions: c, granularity: n, ellipsoid: o }), T, l, U)),
              u && (G.push(T.x, T.y, T.z), I.push(P.x, P.y, P.z)),
              (L = e.Cartesian3.clone(V, L)),
              (T = e.Cartesian3.normalize(e.Cartesian3.cross(P, A, T), T)),
              (V = e.Cartesian3.add(R, e.Cartesian3.multiplyByScalar(T, 2 * l, V), V)),
              (O = e.Cartesian3.add(R, e.Cartesian3.multiplyByScalar(T, l, O), O)),
              y === r.CornerType.ROUNDED || y === r.CornerType.BEVELED
                ? H.push({ leftPositions: B(R, L, V, y, Y) })
                : H.push({ leftPositions: E(q, e.Cartesian3.negate(N, N), V, Y) }))
            : ((V = e.Cartesian3.add(q, N, V)),
              (Q = e.Cartesian3.add(V, e.Cartesian3.negate(e.Cartesian3.multiplyByScalar(T, l, Q), Q), Q)),
              (R = e.Cartesian3.add(V, e.Cartesian3.negate(e.Cartesian3.multiplyByScalar(T, 2 * l, R), R), R)),
              (c[0] = e.Cartesian3.clone(O, c[0])),
              (c[1] = e.Cartesian3.clone(Q, c[1])),
              (U = S(i.PolylinePipeline.generateArc({ positions: c, granularity: n, ellipsoid: o }), T, l, U)),
              u && (G.push(T.x, T.y, T.z), I.push(P.x, P.y, P.z)),
              (L = e.Cartesian3.clone(R, L)),
              (T = e.Cartesian3.normalize(e.Cartesian3.cross(P, A, T), T)),
              (R = e.Cartesian3.add(V, e.Cartesian3.negate(e.Cartesian3.multiplyByScalar(T, 2 * l, R), R), R)),
              (O = e.Cartesian3.add(V, e.Cartesian3.negate(e.Cartesian3.multiplyByScalar(T, l, O), O), O)),
              y === r.CornerType.ROUNDED || y === r.CornerType.BEVELED
                ? H.push({ rightPositions: B(V, L, R, y, Y) })
                : H.push({ rightPositions: E(q, N, R, Y) })),
          (M = e.Cartesian3.negate(A, M))
      }
      q = j
    }
    return (
      (P = o.geodeticSurfaceNormal(q, P)),
      (c[0] = e.Cartesian3.clone(O, c[0])),
      (c[1] = e.Cartesian3.clone(q, c[1])),
      (U = S(i.PolylinePipeline.generateArc({ positions: c, granularity: n, ellipsoid: o }), T, l, U)),
      u && (G.push(T.x, T.y, T.z), I.push(P.x, P.y, P.z)),
      y === r.CornerType.ROUNDED &&
        (F = (function (a) {
          var n = d,
            t = p,
            i = m,
            s = a[1]
          ;(t = e.Cartesian3.fromArray(a[1], s.length - 3, t)), (i = e.Cartesian3.fromArray(a[0], 0, i))
          var o = B((n = e.Cartesian3.midpoint(t, i, n)), t, i, r.CornerType.ROUNDED, !1),
            C = a.length - 1,
            l = a[C - 1]
          return (
            (s = a[C]),
            (t = e.Cartesian3.fromArray(l, l.length - 3, t)),
            (i = e.Cartesian3.fromArray(s, 0, i)),
            [o, B((n = e.Cartesian3.midpoint(t, i, n)), t, i, r.CornerType.ROUNDED, !1)]
          )
        })(U)),
      { positions: U, corners: H, lefts: G, normals: I, endPositions: F }
    )
  }),
    (a.CorridorGeometryLibrary = o)
})
