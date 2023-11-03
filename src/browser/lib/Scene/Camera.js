import { Collision } from '../Collision';
import { config } from '../../config';

/**
 * Camera handler
 */
export class Camera
{
  /**
   * Create new camera.
   * @param {CanvasRenderingContext2D} context - the canvas rendering context
   * @param {number} frames - counter to control the frequency of updates
   */
  constructor (context, frames = 0) {
    this.x = 0;
    this.y = 0;
    this.offsetX = 0;
    this.offsetY = 0;

    this.context = context;
    this.frames = frames;

    this.image = new Image();
    this.image.src = 'img/floor.png';

    this.screen = null;
  }

  /**
   * Update the camera and rendering state for entities
   * @param {Player} player - the player entity
   * @param {array} entities - array of game entities
   */
  update (player, entities) {
    this.frames++;
    if (this.frames >= 15) {
      this.frames = 0;

      this.screen = {
        x: player.x - this.offsetX - this.context.canvas.width / 2 - config.cell.size,
        y: player.y - this.offsetY - this.context.canvas.height / 2 - config.cell.size,
        width: this.context.canvas.width + config.cell.size * 2,
        height: this.context.canvas.height + config.cell.size * 2
      };

      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        const bounds = {};

        if (entity.bounding === 'arc') {
          bounds.x = entity.x - config.cell.radius;
          bounds.y = entity.y - config.cell.radius;
          bounds.width = config.cell.radius * 2;
          bounds.height = config.cell.radius * 2;
        } else if (entity.bounding === 'box') {
          bounds.x = entity.x;
          bounds.y = entity.y;
          bounds.width = config.cell.size;
          bounds.height = config.cell.size;
        }
        entity.sleep = ! Collision.intersection(bounds, this.screen);
      }
    }
  }

  resize () {}

  /**
   * Clear the rendering context to prepare for a new scene.
   */
  newScene () {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  /**
   * Adjust the camera's position based on the passed entity's position.
   * @param {*} entity 
   */
  preRender (entity) {
    const targetX = -entity.x + this.context.canvas.width / 2;
    const targetY = -entity.y + this.context.canvas.height / 2;

    const vectorX = targetX - this.x;
    const vectorY = targetY - this.y;

    this.offsetX = this.x - targetX;
    this.offsetY = this.y - targetY;

    this.x += vectorX / 10;
    this.y += vectorY / 10;

    this.context.save();
    this.context.translate(this.x, this.y);
  }

  /**
   * Restore the rendering context state after rendering.
   */
  postRender () {
    this.context.restore();
  }
}