define(['exports', './Matrix2-9aa31791', './RuntimeError-346a3079', './when-4bbc8319', './ComponentDatatype-93750d1a'], function (t, a, i, n, e) {
  'use strict'
  function s(t, a, i, n, e, s, r) {
    var o = (function (t, a) {
      return (t * a * (4 + t * (4 - 3 * a))) / 16
    })(t, i)
    return (1 - o) * t * a * (n + o * e * (r + o * s * (2 * r * r - 1)))
  }
  var r = new a.Cartesian3(),
    o = new a.Cartesian3()
  function h(t, i, n, h) {
    a.Cartesian3.normalize(h.cartographicToCartesian(i, o), r),
      a.Cartesian3.normalize(h.cartographicToCartesian(n, o), o),
      (function (t, a, i, n, r, o, h) {
        var d,
          u,
          c,
          M,
          l,
          g = (a - i) / a,
          p = o - n,
          _ = Math.atan((1 - g) * Math.tan(r)),
          f = Math.atan((1 - g) * Math.tan(h)),
          m = Math.cos(_),
          v = Math.sin(_),
          C = Math.cos(f),
          H = Math.sin(f),
          O = m * C,
          S = m * H,
          q = v * H,
          U = v * C,
          b = p,
          w = e.CesiumMath.TWO_PI,
          A = Math.cos(b),
          R = Math.sin(b)
        do {
          ;(A = Math.cos(b)), (R = Math.sin(b))
          var y,
            E = S - U * A
          ;(c = Math.sqrt(C * C * R * R + E * E)),
            (u = q + O * A),
            (d = Math.atan2(c, u)),
            0 === c ? ((y = 0), (M = 1)) : (M = 1 - (y = (O * R) / c) * y),
            (w = b),
            (l = u - (2 * q) / M),
            isFinite(l) || (l = 0),
            (b = p + s(g, y, M, d, c, u, l))
        } while (Math.abs(b - w) > e.CesiumMath.EPSILON12)
        var x = (M * (a * a - i * i)) / (i * i),
          D = (x * (256 + x * (x * (74 - 47 * x) - 128))) / 1024,
          P = l * l,
          T =
            i *
            (1 + (x * (4096 + x * (x * (320 - 175 * x) - 768))) / 16384) *
            (d - D * c * (l + (D * (u * (2 * P - 1) - (D * l * (4 * c * c - 3) * (4 * P - 3)) / 6)) / 4)),
          z = Math.atan2(C * R, S - U * A),
          F = Math.atan2(m * R, S * A - U)
        ;(t._distance = T), (t._startHeading = z), (t._endHeading = F), (t._uSquared = x)
      })(t, h.maximumRadius, h.minimumRadius, i.longitude, i.latitude, n.longitude, n.latitude),
      (t._start = a.Cartographic.clone(i, t._start)),
      (t._end = a.Cartographic.clone(n, t._end)),
      (t._start.height = 0),
      (t._end.height = 0),
      (function (t) {
        var a = t._uSquared,
          i = t._ellipsoid.maximumRadius,
          n = t._ellipsoid.minimumRadius,
          e = (i - n) / i,
          s = Math.cos(t._startHeading),
          r = Math.sin(t._startHeading),
          o = (1 - e) * Math.tan(t._start.latitude),
          h = 1 / Math.sqrt(1 + o * o),
          d = h * o,
          u = Math.atan2(o, s),
          c = h * r,
          M = c * c,
          l = 1 - M,
          g = Math.sqrt(l),
          p = a / 4,
          _ = p * p,
          f = _ * p,
          m = _ * _,
          v = 1 + p - (3 * _) / 4 + (5 * f) / 4 - (175 * m) / 64,
          C = 1 - p + (15 * _) / 8 - (35 * f) / 8,
          H = 1 - 3 * p + (35 * _) / 4,
          O = 1 - 5 * p,
          S =
            v * u - (C * Math.sin(2 * u) * p) / 2 - (H * Math.sin(4 * u) * _) / 16 - (O * Math.sin(6 * u) * f) / 48 - (5 * Math.sin(8 * u) * m) / 512,
          q = t._constants
        ;(q.a = i),
          (q.b = n),
          (q.f = e),
          (q.cosineHeading = s),
          (q.sineHeading = r),
          (q.tanU = o),
          (q.cosineU = h),
          (q.sineU = d),
          (q.sigma = u),
          (q.sineAlpha = c),
          (q.sineSquaredAlpha = M),
          (q.cosineSquaredAlpha = l),
          (q.cosineAlpha = g),
          (q.u2Over4 = p),
          (q.u4Over16 = _),
          (q.u6Over64 = f),
          (q.u8Over256 = m),
          (q.a0 = v),
          (q.a1 = C),
          (q.a2 = H),
          (q.a3 = O),
          (q.distanceRatio = S)
      })(t)
  }
  function d(t, i, e) {
    var s = n.defaultValue(e, a.Ellipsoid.WGS84)
    ;(this._ellipsoid = s),
      (this._start = new a.Cartographic()),
      (this._end = new a.Cartographic()),
      (this._constants = {}),
      (this._startHeading = void 0),
      (this._endHeading = void 0),
      (this._distance = void 0),
      (this._uSquared = void 0),
      n.defined(t) && n.defined(i) && h(this, t, i, s)
  }
  Object.defineProperties(d.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    },
    surfaceDistance: {
      get: function () {
        return this._distance
      }
    },
    start: {
      get: function () {
        return this._start
      }
    },
    end: {
      get: function () {
        return this._end
      }
    },
    startHeading: {
      get: function () {
        return this._startHeading
      }
    },
    endHeading: {
      get: function () {
        return this._endHeading
      }
    }
  }),
    (d.prototype.setEndPoints = function (t, a) {
      h(this, t, a, this._ellipsoid)
    }),
    (d.prototype.interpolateUsingFraction = function (t, a) {
      return this.interpolateUsingSurfaceDistance(this._distance * t, a)
    }),
    (d.prototype.interpolateUsingSurfaceDistance = function (t, i) {
      var e = this._constants,
        r = e.distanceRatio + t / e.b,
        o = Math.cos(2 * r),
        h = Math.cos(4 * r),
        d = Math.cos(6 * r),
        u = Math.sin(2 * r),
        c = Math.sin(4 * r),
        M = Math.sin(6 * r),
        l = Math.sin(8 * r),
        g = r * r,
        p = r * g,
        _ = e.u8Over256,
        f = e.u2Over4,
        m = e.u6Over64,
        v = e.u4Over16,
        C =
          (2 * p * _ * o) / 3 +
          r *
            (1 -
              f +
              (7 * v) / 4 -
              (15 * m) / 4 +
              (579 * _) / 64 -
              (v - (15 * m) / 4 + (187 * _) / 16) * o -
              ((5 * m) / 4 - (115 * _) / 16) * h -
              (29 * _ * d) / 16) +
          (f / 2 - v + (71 * m) / 32 - (85 * _) / 16) * u +
          ((5 * v) / 16 - (5 * m) / 4 + (383 * _) / 96) * c -
          g * ((m - (11 * _) / 2) * u + (5 * _ * c) / 2) +
          ((29 * m) / 96 - (29 * _) / 16) * M +
          (539 * _ * l) / 1536,
        H = Math.asin(Math.sin(C) * e.cosineAlpha),
        O = Math.atan((e.a / e.b) * Math.tan(H))
      C -= e.sigma
      var S = Math.cos(2 * e.sigma + C),
        q = Math.sin(C),
        U = Math.cos(C),
        b = e.cosineU * U,
        w = e.sineU * q,
        A = Math.atan2(q * e.sineHeading, b - w * e.cosineHeading) - s(e.f, e.sineAlpha, e.cosineSquaredAlpha, C, q, U, S)
      return n.defined(i)
        ? ((i.longitude = this._start.longitude + A), (i.latitude = O), (i.height = 0), i)
        : new a.Cartographic(this._start.longitude + A, O, 0)
    }),
    (t.EllipsoidGeodesic = d)
})
