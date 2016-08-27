local vcln = elements.allocate("mymod", "VCLN")
elements.element(vcln, elements.element(elements.DEFAULT_PT_DMND))
elements.property(vcln, "Name", "VCLN")
elements.property(vcln, "Loss", 1)
elements.property(vcln, "AirLoss", 1)
elements.property(vcln, "Collision", -1)
elements.property(vcln, "Color", 0xffffffff)

local function funcUpdate(i,x,y,s,nt)
    tmpvx = tpt.get_property("vx", i)
    tmpvy = tpt.get_property("vy", i)
    rand = math.random()
    if (2*rand % 1 < 0.01) then
        if (rand < 1) then tmpvx = -tmpvx; tmpvy = -tmpvy; end
        tpt.set_property("vx", tmpvy, i)
        tpt.set_property("vy", -tmpvx, i)
	j = tpt.create(((x-tmpvy-4)%604)+4, ((y+tmpvx-4)%376)+4, "VCLN")
        tpt.set_property("vx", -tmpvy, j)
        tpt.set_property("vy", tmpvx, j)
    end
    tmpvx2 = 0; tmpvy2 = 0; parts = 0
    for r in sim.neighbors(x,y,1,1) do
        if sim.partProperty(r, "type") == elem.DEFAULT_PT_PHOT then
            parts = parts + 1; tmpvx2 = tmpvx2 + sim.partProperty(r, "vx"); tmpvy2 = tmpvy2 + sim.partProperty(r, "vy");
        end
    end
    if (parts ~= 0) then
        tpt.set_property("vx", tmpvx + tmpvx2/parts*0.2, i)
        tpt.set_property("vy", tmpvy + tmpvy2/parts*0.2, i)
    end
end

elements.property(vcln, "Update", funcUpdate) 