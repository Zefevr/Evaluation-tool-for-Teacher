import { JsonController, Get, Post, Param, Body, NotFoundError } from 'routing-controllers'
import { Batch } from './entity'

@JsonController()
export default class BatchController {

  @Get('/batches')
  async allBatches(){
    const batches = await Batch.find()
    if (!batches) throw new NotFoundError('Sorry but that table does not exist')
    return batches
  }

  @Get('/batches/:id([0-9]+)')
  getBatch(
    @Param('id') id: number
  ) {
    return Batch.findOne(id)
  }

  @Post('/batches')
  async createBatch(
    @Body() batch: Batch
  ) {
    const entity = await batch.save()
    return { entity }
  }
}

// Maybe addind a delete later on