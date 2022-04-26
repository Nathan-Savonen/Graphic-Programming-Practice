precision mediump float;

uniform vec3 uLightDirection;
uniform vec3 uCameraPosition;
uniform sampler2D uTexture;

varying vec2 vTexcoords;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main(void) {
    // diffuse contribution
    // todo #1 normalize the light direction and store in a separate variable
    gl_FragColor = vec4(uLightDirection,1.0);
    vec3 lightD = normalize(uLightDirection);
    gl_FragColor = vec4(lightD,1.0);
    
    // todo #2 normalize the world normal and store in a separate variable
    vec3 normalW = normalize(vWorldNormal);
    gl_FragColor = vec4(normalW,1.0);
    // todo #3 calculate the lambert term
    float lambertTerm = dot(lightD,normalW);
    gl_FragColor = vec4(lambertTerm,lambertTerm,lambertTerm,1.0);

    // specular contribution
    // todo #4 in world space, calculate the direction from the surface point to the eye (normalized)
    vec3 directionSE = normalize(uCameraPosition - vWorldPosition);
    gl_FragColor = vec4(directionSE,1.0);

    // todo #5 in world space, calculate the reflection vector (normalized)
    vec3 reflectionVec = normalize(-lightD + 2.0*lambertTerm*normalW);
    gl_FragColor = vec4(reflectionVec,1.0);

    // todo #6 calculate the phong term
    float phongTerm = pow(dot(reflectionVec,directionSE),64.0);
    gl_FragColor = vec4(phongTerm,phongTerm,phongTerm,1.0);

    // combine
    // todo #7 apply light and material interaction for diffuse value by using the texture color as the material
    // todo #8 apply light and material interaction for phong, assume phong material color is (0.3, 0.3, 0.3)


    vec3 albedo = texture2D(uTexture, vTexcoords).rgb;

    vec3 ambient = albedo * 0.1;
     vec3 diffuseColor = vec3(1,1,1)*lambertTerm*albedo;
     vec3 specularColor = vec3(0.3,0.3,0.3)*lambertTerm*albedo;

    // todo #9
    // add "diffuseColor" and "specularColor" when ready
    vec3 finalColor = ambient + diffuseColor + specularColor;

    gl_FragColor = vec4(finalColor, 1.0);
    
    
}

// EOF 00100001-10