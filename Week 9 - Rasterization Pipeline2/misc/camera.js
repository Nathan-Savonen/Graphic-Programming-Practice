function Camera(input) {
    // The following two parameters will be used to automatically create the cameraWorldMatrix in this.update()
    this.cameraYaw = 0;
    this.cameraPosition = new Vector3();

    this.cameraWorldMatrix = new Matrix4();

    // -------------------------------------------------------------------------
    this.getViewMatrix = function() {
        return this.cameraWorldMatrix.clone().inverse();
    }

    // -------------------------------------------------------------------------
    this.getForward = function() {
        // todo #6 - pull out the forward direction from the world matrix and return as a vector
        var inverseCamMatrix = this.getViewMatrix();
        var xForward = this.cameraWorldMatrix.getElement(0,2);
        var yForward = this.cameraWorldMatrix.getElement(1,2);
        var zForward = this.cameraWorldMatrix.getElement(2,2);


        //         - recall that the camera looks in the "backwards" direction
        
        return new Vector3(xForward, yForward, -zForward).normalize();
    }
    // -------------------------------------------------------------------------
    this.update = function(dt) {
        var currentForward = this.getForward();

        if (input.up) {
            // todo #7 - move the camera position a little bit in its forward direction
            this.cameraPosition.add(currentForward.multiplyScalar(0.25));
        }

        if (input.down) {
            // todo #7 - move the camera position a little bit in its backward direction
            this.cameraPosition.subtract(currentForward.multiplyScalar(0.25));
        }

        if (input.left) {
            // todo #8 - add a little bit to the current camera yaw
            this.cameraYaw += 1;
        }

        if (input.right) {
            // todo #8 - subtract a little bit from the current camera yaw
            this.cameraYaw -= 1;
        }

        // todo #7 - create the cameraWorldMatrix from scratch based on this.cameraPosition
        this.cameraWorldMatrix.makeTranslation(this.cameraPosition);

        // todo #8 - create a rotation matrix based on cameraYaw and apply it to the cameraWorldMatrix
        var rotationMatrix = new Matrix4().makeRotationY(this.cameraYaw);

        this.cameraWorldMatrix.multiply(rotationMatrix);
        // (order matters!)
    }
}

// EOF 00100001-10
