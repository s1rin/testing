<style>
html { margin: 0px}
table thead tr td{
    font-family: Arial, Helvetica, sans-serif;
}
table tbody tr td{
    font-family: Arial, Helvetica, sans-serif;
}
.scrollStyle
{
overflow-x:auto;
}
</style>

<div class="row">
	<div class="col-md-12">
	
		
        <form method="post" target="_blank" action="<?php echo base_url('Laporan/getHasilBiayaTotal/2'); ?>">
            <input type="hidden" name="tanggalawal" value="<?php echo $tanggalawal; ?>">
			<input type="hidden" name="tanggalakhir" value="<?php echo $tanggalakhir; ?>">
            <button type="submit" class="btn btn-success btn-flat pull-right"><i class="fa fa-file-excel-o"></i></button>
        </form>
	</div>
</div>	
<div class="table-responsive" width="100%">
	<table class="table table-bordered" border="1" width="100%">
				<thead>
					<tr>
					<?php 
							$z = 0;
							if (count($hasil) > 0)
							{
								foreach ($hasil[0] as $key => $value) { 
									$z++;
								}
							}
                            ?> 
						<th width="80%"   colspan="<?php echo $z+1;?>" style="padding-bottom: 20px"><center><h3>REKAP TOTALAN BIAYA KENDARAAN</h3></center></th>
					</tr>
				</thead>
	</table>
</div>
<div class="table-responsive" width="100%">
	<table id="table_1_total" class="table table-bordered" border="1"  width="100%">
		<thead>
			<tr>
				<th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;">
                                   NO
                                </th>
				<?php
							$i = 0;
							if (count($hasil) > 0)
							{
                            foreach ($hasil[0] as $key => $value) { 
								if ($i < 2)
								{
							    ?>
                                <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;">
                                    <?= strtoupper($key); ?>
                                </th>
                            <?php
								}
								else
								{
								?>
                                <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;">
                                    <?= strtoupper($key); ?>
                                </th>
                            <?php	
								}	
								$i++;
							}
							}
                            ?>
			</tr>
		</thead>
		<tbody>
			<?php
					for($i=0;$i<count($hasil);$i++) { ?>
					<tr>
						<th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;">
	                                    <?= $i+1; ?>
	                                </th>
					<?php	
                        		$j = 0;
	                            foreach ($hasil[$i] as $key => $value) 
	                            { 
									if ($j < 2)
									{
								    ?>
	                                <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;">
	                                    <?= strtoupper($value); ?>
	                                </th>
	                            <?php
									}
									else
									{
									?>
	                                <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;">
	                                    <?= strtoupper($value); ?>
	                                </th>
	                            <?php	
									}	
									$j++;
								}
                     ?>
                     </tr>	
                     <?php
					}
				?>
		</tbody>
	</table>
</div>
<br>
<!-- <div class="table-responsive">
    <table class="table table-bordered" border="1" width="100%">
                <thead>
                    <tr>
                        <th colspan="<?php echo $z-4+1;?>" style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;width: 505px;border: 0px;">&nbsp;
                        </th>
                        <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;">Di Ketahui,
                        </th>
                        <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;">Di Setujui,
                        </th>
                        <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;">Di Periksa,
                        </th>
                        <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;">Di Buat,
                        </th>
                    </tr>
                    <tr>
                        <th colspan="<?php echo $z-4+1;?>" style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;height: 60px;idth: 305px;border: 0px;">
                        </th>
                        <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;height: 60px;">
                        </th>
                        <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;height: 60px;">
                        </th>
                        <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;height: 60px;">
                        </th>
                        <th style="text-align: left;padding: 10px;font-size: 11px;font-family: monospace;height: 60px;">
                        </th>
                    </tr>
                </thead>
    </table>
</div>
 -->
