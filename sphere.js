/*
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 * 
 * Example usage:
 * var mySphere = new Sphere(new Vector3(1, 2, 3), 4.23);
 * var myRay = new Ray(new Vector3(0, 1, -10), new Vector3(0, 1, 0));
 * var result = mySphere.raycast(myRay);
 * 
 * if (result.hit) {
 *   console.log("Got a valid intersection!");
 * }
 */

var Sphere = function(center, radius) {
  // Sanity checks (your modification should be below this where indicated)
  if (!(this instanceof Sphere)) {
    console.error("Sphere constructor must be called with the new operator");
  }

  this.center = center;
  this.radius = radius;

  // todo - make sure this.center and this.radius are replaced with default values if and only if they
  // are invalid or undefined (i.e. center should be of type Vector3 & radius should be a Number)
  // - the default center should be the zero vector
  // - the default radius should be 1
  // YOUR CODE HERE

  if(center === undefined){
    this.center = new Vector3(0,0,0);
  }
  if(radius === undefined){
    this.radius = 1;
  }

  // Sanity checks (your modification should be above this)
  if (!(this.center instanceof Vector3)) {
    console.error("The sphere center must be a Vector3");
  }

  if ((typeof(this.radius) != 'number')) {
    console.error("The radius must be a Number");
  }
};

Sphere.prototype = {
  
  //----------------------------------------------------------------------------- 
  raycast: function(r1) {
    // todo - determine whether the ray intersects has a VALID intersection with this
	//        sphere and if so, where. A valid intersection is on the is in front of
	//        the ray and whose origin is NOT inside the sphere

  //var r1 = new Ray(new Vector3(0, 0, -10), new Vector3(0, 0, 1));
  //var s3 = new Sphere(new Vector3(), 1);

  var origin = r1.origin.clone();
  
  var direction = r1.direction.clone();
  var radius = this.radius * this.radius;

  var a = direction.dot(direction);
  var b = 2 * direction.dot((origin.clone().subtract(this.center.clone())));
  var c = origin.clone().subtract(this.center.clone()).dot(origin.clone().subtract(this.center.clone()))-(radius);

  var discriminant = (b * b) - 4 *a *c;
  var root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  var root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  //var a = direction.dot(direction);
  //var b = direction.multiplyScalar(2).dot((origin.clone().subtract(this.center.clone())));
  //var c = origin.clone().subtract(this.center.clone()).dot(origin.clone().subtract(this.center.clone()))-(radius);
  
  /*
  if(discriminant < 0){
    var result = {hit:false, point:null}
    return result;
  }else{
    var root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    var root2 = (-b - Math.sqrt(discriminant)) / (2 *a);
    var intersection = r1.direction.clone().multiplyScalar(root2).add(origin);

  }  


    if(root1 < 0 || root2 < 0){
      var result = {hit : false, point:null}
      return result;
    }
    if(root1>root2){
      result = {hit:true
        ,point:r1.direction.clone().multiplyScalar(root2).add(origin),
        normal:fromTo(this.center,r1.direction.clone().multiplyScalar(root2).add(origin).normalize())
         ,distance: root1};
    } else if(root2 > root1){
      result = {hit:true
        ,point:r1.direction.clone().multiplyScalar(root1).add(origin)
        ,normal:fromTo(this.center,r1.direction.clone().multiplyScalar(root1).add(origin).normalize()) 
        ,distance: root1};
    }
  */
  


  

  
    
    // Recommended steps
    // ------------------
    // 0. (optional) watch the video showing the complete implementation of plane.js
    //    You may find it useful to see a different piece of geometry coded.

    // 1. review slides/book math
    
    // 2. identity the vectors needed to solve for the coefficients in the quadratic equation

    // 3. calculate the discriminant
    
    // 4. use the discriminant to determine if further computation is necessary 
    //    if (discriminant...) { ... } else { ... }

    // 5. return the following object literal "result" based on whether the intersection
    //    is valid (i.e. the intersection is in front of the ray AND the ray is not inside
    //    the sphere)
    //    case 1: no VALID intersections
    //      var result = { hit: false, point: null }
    //    case 2: 1 or more intersections
    //      var result = {
    //        hit: true,
    //        point: 'a Vector3 containing the CLOSEST VALID intersection',
    //        normal: 'a vector3 containing a unit length normal at the intersection point',
    //        distance: 'a scalar containing the intersection distance from the ray origin'
    //      }

    // An object created from a literal that we will return as our result
    // Replace the null values in the properties below with the right values
    var root2use = root1;

    if(root1 > root2){
      root2use = root2;
    }
    if(Math.sqrt(discriminant)<0 || (root1 <0 || root2 <0)){
      var result = {hit :false, point :null}
      return result;
    }

    if(root2use > 0){

    var root2use1 = r1.direction.clone().multiplyScalar(root2use);
    var intersection = r1.origin.clone().add(root2use1);


    return {
      hit: true,      // should be of type Boolean
      point: intersection,//r1.direction.clone().multiplyScalar(root2).add(origin),    // should be of type Vector3
      normal: (intersection.clone().subtract(this.center)).normalize(),//fromTo(this.center,r1.direction.clone().multiplyScalar(root2).add(origin).normalize()),   // should be of type Vector3
      distance: direction.multiplyScalar(root2use).length() // should be of type Number (scalar)
    }
  }else{
    return {hit: false, point :null}
  }

}
}

// EOF 00100001-10